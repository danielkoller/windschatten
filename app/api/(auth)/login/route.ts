import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import { getUserByUsernameWithPasswordHash } from '../../../../database/users';
import { createSerializedRegisterSessionTokenCookie } from '../../../../utils/cookies';
import { createCsrfSecret } from '../../../../utils/csrf';

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
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
  const userWithPasswordHash = await getUserByUsernameWithPasswordHash(
    result.data.username,
  );

  if (!userWithPasswordHash) {
    return NextResponse.json(
      { errors: [{ message: 'User not found - please register first!' }] },
      { status: 401 },
    );
  }

  // validate the password
  if (!result.data.password) {
    return NextResponse.json(
      { errors: [{ message: 'Password is empty - please enter a password!' }] },
      { status: 400 },
    );
  }

  if (!userWithPasswordHash.passwordHash) {
    return NextResponse.json(
      {
        errors: [
          {
            message: 'User has invalid password hash - please contact support!',
          },
        ],
      },
      { status: 500 },
    );
  }

  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );
  if (!isPasswordValid) {
    return NextResponse.json(
      { errors: [{ message: 'Password is not valid - please try again!' }] },
      { status: 401 },
    );
  }

  // Create the token
  const token = crypto.randomBytes(80).toString('base64');

  const csrfSecret = createCsrfSecret();

  // Create a session
  const session = await createSession(
    token,
    userWithPasswordHash.id,
    csrfSecret,
  );

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

  // Add the new header

  return NextResponse.json(
    {
      user: { username: userWithPasswordHash.username },
    },
    {
      status: 200,
      // - Attach the new cookie serialized to the header fo the response
      headers: { 'Set-Cookie': serializedCookie },
    },
  );
};
