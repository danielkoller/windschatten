import styles from './page.module.scss';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: 'Windschatten',
  description: 'You will never ride alone',
};

type Props = { searchParams: { returnTo?: string | string[] } };

export default function RegisterPage(props: Props) {
  return (
    <main className={styles.container}>
      <h1>We need some personal infos, before we can start</h1>
      <p>Start riding right away </p>
      <RegisterForm returnTo={props.searchParams.returnTo} />
    </main>
  );
}
