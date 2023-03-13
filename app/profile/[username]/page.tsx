import {
  faComments,
  faUser,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAllPostsFromUsersWithTheSameDistricts } from '../../../database/posts';
import { getValidSessionByToken } from '../../../database/sessions';
import {
  getAllUsersWithTheSameDistricts,
  getFullUserByUsername,
} from '../../../database/users';
import Forum from '../../group/Forum';
import Map from '../../map/Map';

type Props = { params: { username: string } };

export default async function ProfilePage({ params }: Props) {
  const user = await getFullUserByUsername(params.username);
  const posts = await getAllPostsFromUsersWithTheSameDistricts(
    user.homeDistrict,
    user.workDistrict,
  );

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

  // check if i have a valid session

  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // if no redirect to home
  if (!session) {
    redirect('/');
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {user.homeDistrict} - {user.workDistrict}
      </h1>
      <div className="w-full my-8">
        <Map />
      </div>
      <div className="w-full">
        <div className="flex flex-row items-start justify-center">
          <div className="w-2/3 pr-5">
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faComments} className="text-4xl mb-2" />
              <h3 className="text-4xl font-extrabold dark:text-white">Chat</h3>
              <div className="w-full h-96 my-4 overflow-y-auto">
                <div className="bg-gray-600 rounded-lg p-4">
                  <div className="overflow-y-auto w-full mt-4">
                    <div className="flex flex-col items-start">
                      {posts.map((post) => (
                        <div
                          key={`post-${post.id}`}
                          className={`${
                            post.username === params.username
                              ? 'self-end'
                              : 'self-start'
                          } `}
                        >
                          <div
                            className={`${
                              post.username === params.username
                                ? 'chat-header'
                                : 'chat-header'
                            } mt-2`}
                          >
                            {post.username === params.username
                              ? 'You'
                              : post.username}
                          </div>
                          <div
                            className={`${
                              post.username === params.username
                                ? 'chat-bubble'
                                : 'chat-bubble'
                            } max-w-md`}
                          >
                            {post.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Forum />
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faUserGroup} className="text-4xl mb-2" />
              <h3 className="text-lg font-bold my-4 items-center">
                Connect with cyclists with the same route
              </h3>

              <div className="overflow-y-auto w-full mt-4">
                <table className="table table-zebra w-full pl-5">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
