import LoginForm from './LoginForm';

export const metadata = {
  title: 'Windschatten',
  description: 'You will never ride alone',
};

type Props = { searchParams: { returnTo?: string | string[] } };

export default function LoginPage(props: Props) {
  return <LoginForm returnTo={props.searchParams.returnTo} />;
}
