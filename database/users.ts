import { cache } from 'react';
import { sql } from './connect';

type User = {
  id: number;
  username: string;
  password: string;
  homeDistrict: string;
  workDistrict: string;
};

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
