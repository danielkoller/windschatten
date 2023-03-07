import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';

export const dynamic = 'force-dynamic';

export default async function Header() {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <div className="navbar bg-base-100">
      {user ? (
        <>
          <Link
            className="btn btn-ghost normal-case text-xl"
            href={`/profile/${user.username}`}
          >
            {user.username}
          </Link>
          <Link
            className="btn btn-ghost normal-case text-xl"
            href="/logout"
            prefetch={false}
          >
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link
            className="btn btn-ghost normal-case text-xl"
            href="/registration"
          >
            Registration
          </Link>
          <Link className="btn btn-ghost normal-case text-xl" href="/login">
            Login
          </Link>
        </>
      )}
    </div>
  );
}
