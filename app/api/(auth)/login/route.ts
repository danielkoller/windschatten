import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getUserByUsernameWithPasswordHash } from '../../../../database/users';

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

  return NextResponse.json(
    { user: { username: userWithPasswordHash.username } },
    { status: 200 },
  );
};
