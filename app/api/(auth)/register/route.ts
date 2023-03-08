import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import { createUser, getUserByUsername } from '../../../../database/users';
import { createSerializedRegisterSessionTokenCookie } from '../../../../utils/cookies';
import { createCsrfSecret } from '../../../../utils/csrf';

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  workDistrict: z.string(),
  homeDistrict: z.string(),
});

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: { username: string } };

export const POST = async (request: NextRequest) => {
  // 1. validate the data
  const body = await request.json();

  const result = userSchema.safeParse(body);

  if (!result.success) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages
    // console.log(result.error.issues);

    return NextResponse.json(
      {
        errors: result.error.issues,
      },
      { status: 400 },
    );
  }

  // check if the string is empty
  if (!result.data.username || !result.data.password) {
    return NextResponse.json(
      {
        errors: [
          {
            message:
              'Username or Password is empty - please fill out the forms!',
          },
        ],
      },
      { status: 400 },
    );
  }

  // 2. check if the user already exist
  // 2.a compare the username with the database

  const user = await getUserByUsername(result.data.username);

  if (user) {
    return NextResponse.json(
      {
        errors: [
          { message: 'Username is already taken - please choose another one!' },
        ],
      },
      { status: 400 },
    );
  }

  // 3. hash the password
  const passwordHash = await bcrypt.hash(result.data.password, 12);

  // 4. create the user
  const newUser = await createUser(
    result.data.username,
    passwordHash,
    result.data.homeDistrict,
    result.data.workDistrict,
  );

  if (!newUser) {
    return NextResponse.json(
      {
        errors: [{ message: 'Internal Server Error - User Creation failed!' }],
      },
      { status: 500 },
    );
  }

  // 5. Create a session
  // First off create the token
  const token = crypto.randomBytes(80).toString('base64');

  const csrfSecret = createCsrfSecret();
  // Then create the session
  const session = await createSession(token, newUser.id, csrfSecret);

  if (!session) {
    return NextResponse.json(
      {
        errors: [
          { message: 'Session could not be created - please try again!' },
        ],
      },
      { status: 500 },
    );
  }

  const serializedCookie = createSerializedRegisterSessionTokenCookie(
    session.token,
  );

  // 6. return the new username
  return NextResponse.json(
    { user: { username: newUser.username } },
    {
      status: 200,
      // - Attach the new cookie serialized to the header of the response
      headers: { 'Set-Cookie': serializedCookie },
    },
  );
};
