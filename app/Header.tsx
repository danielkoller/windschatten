import {
  faHome,
  faPlus,
  faSignIn,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cookies } from 'next/headers';
import Image from 'next/image';
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
    <div className="flex justify-between items-center bg-base-100 p-4">
      <div className="flex items-center">
        <Link className="btn btn-ghost normal-case text-xl" href="/">
          <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
        </Link>
      </div>
      {user ? (
        <div className="flex items-center">
          <Link
            className="btn btn-ghost normal-case text-xl mr-4"
            href={`/profile/${user.username}`}
          >
            <div className="avatar mr-4">
              <div className="w-12 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                <Image src={user.profilePic} width={32} height={32} />
              </div>
            </div>
            {user.username}
          </Link>
          <Link
            className="btn btn-ghost normal-case text-xl"
            href="/logout"
            prefetch={false}
          >
            <FontAwesomeIcon icon={faSignOut} className="mr-2" />
            Logout
          </Link>
        </div>
      ) : (
        <div className="flex justify-end flex-1">
          <Link
            className="btn btn-ghost normal-case text-xl mr-4"
            href="/registration"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Registration
          </Link>
          <Link className="btn btn-ghost normal-case text-xl" href="/login">
            <FontAwesomeIcon icon={faSignIn} className="mr-2" />
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
