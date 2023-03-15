import { cache } from 'react';
import { sql } from './connect';

export type Post = {
  id: number;
  content: string;
  userId: number;
};

export type PostWithUsernameAndProfilePic = Post & {
  username: string;
  profilePic: string;
};

// get all posts from users with the same home and work districts as the logged in user who is viewing the posts
export const getAllPostsFromUsersWithTheSameDistricts = cache(
  async (homeDistrict: string, workDistrict: string) => {
    const posts = await sql<PostWithUsernameAndProfilePic[]>`
      SELECT
        posts.id,
        posts.content,
        posts.user_id,
        users.username,
        users.profile_Pic
      FROM
        posts
      INNER JOIN
        users ON (
          users.home_district = ${homeDistrict} AND
          users.work_district = ${workDistrict} AND
          users.id = posts.user_id
        )
    `;
    return posts;
  },
);

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
