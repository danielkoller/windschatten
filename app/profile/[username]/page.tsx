import { faComments, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getAllPostsFromUsersWithTheSameDistricts } from '../../../database/posts';
import { getValidSessionByToken } from '../../../database/sessions';
import {
  getAllUsersWithTheSameDistricts,
  getFullUserByUsername,
} from '../../../database/users';
import Forum from '../../group/Forum';
import Map from '../../map/Map';

export const metadata = {
  title: 'Profile | Windschatten',
  description:
    'This is the profile page of Windschatten. Here you can see the best route for you to take to work and home by bicycle. You can also see the posts of other users in your district and interact with them. So you will never ride alone again!',
};

type Props = { params: { username: string } };

export default async function ProfilePage({ params }: Props) {
  const user = await getFullUserByUsername(params.username);
  const posts = user
    ? await getAllPostsFromUsersWithTheSameDistricts(
        user.homeDistrict,
        user.workDistrict,
      )
    : [];

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
      <h1 className=" text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white text-center">
        {user.homeDistrict} - {user.workDistrict}
      </h1>
      <div className="w-full">
        <Map />
      </div>
      <div className="w-full">
        <div className="flex flex-col md:flex-row items-start justify-center">
          <div className="w-full md:w-2/3 pr-0 md:pr-5">
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faComments} className="text-4xl mb-2" />
              <h3 className="text-4xl font-extrabold dark:text-white mb-4">
                Chat
              </h3>
              <div className="w-full h-96 overflow-y-auto">
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
                          } flex`}
                        >
                          {post.username !== params.username && (
                            <div className="chat-image avatar mr-2 ">
                              <div className="w-10 rounded-full">
                                <Image
                                  src={post.profilePic}
                                  alt="Profile Picture of all the other users"
                                  width={32}
                                  height={32}
                                />
                              </div>
                            </div>
                          )}
                          <div
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
                          {post.username === params.username && (
                            <div className="chat-image avatar pl-2 ">
                              <div className="w-10 rounded-full">
                                <Image
                                  src={user.profilePic}
                                  alt="Profile Picture of the current logged in user"
                                  width={32}
                                  height={32}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Forum />
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faUserGroup} className="text-4xl mb-2" />
              <h3 className="text-lg font-bold my-4 items-center">
                Connect with cyclists with the same route
              </h3>
              <div className="overflow-y-auto h-96 w-full mt-4">
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
                          <div className="avatar mr-4 ">
                            <div className="w-10 rounded-full">
                              <Image
                                src={otherUser.profilePic}
                                alt="Profile Picture of all the other users"
                                width={32}
                                height={32}
                              />
                            </div>
                          </div>
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
