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
    <div>
      <h1 className="text-3xl">
        {user.homeDistrict} - {user.workDistrict}
      </h1>
      <Map />
      <h2>Hi, {user.username}, find your fastest route here!</h2>

      <h3>Other users with the same route:</h3>
      <ul>
        {otherUsers.map((otherUser) => (
          <li key={`user-${otherUser.id}`}>{otherUser.username}</li>
        ))}
      </ul>
    </div>
  );
}
