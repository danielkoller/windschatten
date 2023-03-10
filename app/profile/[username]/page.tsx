import { faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import {
  getAllUsersWithTheSameDistricts,
  getFullUserByUsername,
} from '../../../database/users.ts';
import Map from '../../route/Map.tsx';

type Props = { params: { username: string } };

export default async function ProfilePage({ params }: Props) {
  const user = await getFullUserByUsername(params.username);

  if (!user) {
    return <div>User not found</div>;
  }

  const usersWithSameDistricts = await getAllUsersWithTheSameDistricts(
    user.homeDistrict,
    user.workDistrict,
  );

  // Filter out the current user from the list of users
  const otherUsers = usersWithSameDistricts.filter(
    (otherUser) => otherUser.id !== user.id,
  );

  return (
    <div className=" flex flex-col items-center justify-center px-4 py-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {user.homeDistrict} - {user.workDistrict}
      </h1>
      <div className="w-full">
        <Map />
      </div>
      <div className="flex flex-col items-center justify-center px-4 py-8">
        <FontAwesomeIcon icon={faUserGroup} className="text-4xl mb-2" />
        <h3 className="text-4xl font-extrabold dark:text-white">
          Other users with the same route:
        </h3>
        <div className="overflow-x-auto w-full mt-4">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {otherUsers.map((otherUser) => (
                <tr key={`user-${otherUser.id}`}>
                  <td>
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    {otherUser.username}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link href="/group">
          <button className="btn mt-4">Join this group</button>
        </Link>
      </div>
    </div>
  );
}
