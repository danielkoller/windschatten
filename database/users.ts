import { cache } from 'react';
import { sql } from './connect';

export type User = {
  id: number;
  username: string;
};

type UserWithPasswordHash = User & {
  passwordHash: string;
};

type UserWithProfilePicAndDistricts = User & {
  homeDistrict: string;
  workDistrict: string;
  profilePic: string;
};

type UserWithProfilePic = User & {
  profilePic: string;
};

// A user wants to change their home district and/or work district
export const updateUserDistricts = cache(
  async (id: number, homeDistrict: string, workDistrict: string) => {
    const [user] = await sql<UserWithProfilePicAndDistricts[]>`
      UPDATE
        users
      SET
        home_district = ${homeDistrict},
        work_district = ${workDistrict}
      WHERE
        id = ${id}
      RETURNING
        id,
        username,
        home_district AS "homeDistrict",
        work_district AS "workDistrict",
        profile_pic AS "profilePic"
    `;
    return user;
  },
);

// We use this to get the username when we have the user id
export const getUsernameById = cache(async (id: number) => {
  const [user] = await sql<{ username: string }[]>`
    SELECT
      username
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user;
});

// We use this to get the user when we have the session token
export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<
    { id: number; username: string; profilePic: string; csrfSecret: string }[]
  >`
    SELECT
      users.id,
      users.username,
      users.profile_pic,
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
    const users = await sql<UserWithProfilePic[]>`
      SELECT
        id,
        username,
        profile_pic AS "profilePic"
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
  const [user] = await sql<UserWithProfilePicAndDistricts[]>`
    SELECT
      id,
      username,
      home_district AS "homeDistrict",
      work_district AS "workDistrict",
      profile_pic AS "profilePic"
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

// We use this to create a new user
export const createUser = cache(
  async (
    username: string,
    passwordHash: string,
    homeDistrict: string,
    workDistrict: string,
    profilePic: string,
  ) => {
    const [user] = await sql<{ id: number; username: string }[]>`
      INSERT INTO users
        (username, password_hash, home_district, work_district, profile_pic)
      VALUES
        (${username}, ${passwordHash}, ${homeDistrict}, ${workDistrict}, ${profilePic})
      RETURNING
        id,
        username
    `;
    return user;
  },
);
