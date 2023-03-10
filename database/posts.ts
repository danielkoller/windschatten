import { cache } from 'react';
import { sql } from './connect';

export type Post = {
  id: number;
  content: string;
  userId: number;
};

// get all posts
export const getAllPosts = cache(async () => {
  const posts = await sql<Post[]>`
    SELECT * FROM posts
  `;

  return posts;
});

// get a single post
export const getPostById = cache(async (id: number) => {
  const [post] = await sql<Post[]>`
    SELECT
      *
    FROM
      posts
    WHERE
      id = ${id}
  `;
  return post;
});

// get all posts by a user
export const getPostsByUserId = cache(async (userId: number) => {
  const posts = await sql<Post[]>`
    SELECT
      *
    FROM
      posts
    WHERE
      user_id = ${userId}
  `;
  return posts;
});

// create a post
export const createPost = cache(async (text: string, userId: number) => {
  const [post] = await sql<Post[]>`
      INSERT INTO posts
        (content, user_id)
      VALUES
        (${text}, ${userId})
      RETURNING *
    `;
  return post;
});

// delete a post
export const deletePostById = cache(async (id: number) => {
  const [post] = await sql<Post[]>`
    DELETE FROM
      posts
    WHERE
      id = ${id}
    RETURNING *
  `;
  return post;
});
