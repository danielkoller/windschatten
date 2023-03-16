import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createPost, Post } from '../../../database/posts';
import { getUserBySessionToken } from '../../../database/users';

const postType = z.object({
  content: z.string(),
});

export type PostResponseBodyPost = { error: string } | { post: Post };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<PostResponseBodyPost>> {
  // this is a protected Route Handler
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated!' }, { status: 401 });
  }

  const body = await request.json();

  const result = postType.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request body is missing the needed property content',
      },
      { status: 400 },
    );
  }

  const newPost = await createPost(result.data.content, user.id);

  if (!newPost) {
    return NextResponse.json({ error: 'Post not created!' }, { status: 500 });
  }

  return NextResponse.json({ post: newPost });
}
