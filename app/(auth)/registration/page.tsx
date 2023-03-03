import styles from './page.module.scss';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: 'Windschatten',
  description: 'You will never ride alone',
};

export default function RegisterPage() {
  return (
    <main className={styles.container}>
      <h1>We need some personal infos, before we can start</h1>
      <p>Start riding right away </p>
      <RegisterForm />
    </main>
  );
}