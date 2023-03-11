import { cache } from 'react';
import { sql } from './connect';

export type User = {
  id: number;
  username: string;
};

type UserWithPasswordHash = User & {
  passwordHash: string;
};

type UserWithDistricts = User & {
  homeDistrict: string;
  workDistrict: string;
};

// We use this to get the user when we have the session token
export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<
    { id: number; username: string; csrfSecret: string }[]
  >`
    SELECT
      users.id,
      users.username,
      sessions.csrf_secret
    FROM
      users
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.user_id = users.id AND
        sessions.expiry_timestamp > now()
      )
  `;
  return user;
});

// We use this to get all users with the same home and work districts
export const getAllUsersWithTheSameDistricts = cache(
  async (homeDistrict: string, workDistrict: string) => {
    const users = await sql<User[]>`
      SELECT
        id,
        username
      FROM
        users
      WHERE
        home_district = ${homeDistrict}
        AND work_district = ${workDistrict}
    `;
    return users;
  },
);

export const getUserByUsernameWithPasswordHash = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      id,
      username,
      password_hash AS "passwordHash"
    FROM
      users
    WHERE
      username = ${username}
  `;
    return user;
  },
);

// We use this so we can get the full user object when we need it
export const getFullUserByUsername = cache(async (username: string) => {
  const [user] = await sql<UserWithDistricts[]>`
    SELECT
      id,
      username,
      home_district AS "homeDistrict",
      work_district AS "workDistrict"
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user;
});

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<{ id: number; username: string }[]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user;
});

export const createUser = cache(
  async (
    username: string,
    passwordHash: string,
    homeDistrict: string,
    workDistrict: string,
  ) => {
    const [user] = await sql<{ id: number; username: string }[]>`
      INSERT INTO users
        (username, password_hash, home_district, work_district)
      VALUES
        (${username}, ${passwordHash}, ${homeDistrict}, ${workDistrict})
      RETURNING
        id,
        username
    `;
    return user;
  },
);
