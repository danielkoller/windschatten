import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: 'Windschatten',
  description: 'You will never ride alone',
};

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function RegisterPage(props: Props) {
  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // if yes redirect to home
  if (session) {
    redirect('/');
  }
  return (
    <main>
      <RegisterForm returnTo={props.searchParams.returnTo} />
    </main>
  );
}
