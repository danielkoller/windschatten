import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../database/sessions';
import Forum from './Forum';

export const metadata = {
  title: 'Forum by Windschatten',
  description:
    'This is the forum page of Windschatten. Here you can interact with other users in your district. So you will never ride alone again!',
};

export default async function GroupPage() {
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
    <div className=" flex flex-col items-center justify-center px-4 py-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Group Page
      </h1>
      <Forum />
    </div>
  );
}
