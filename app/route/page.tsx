import Map from './Map';
import styles from './page.module.scss';

export const metadata = {
  title: 'Windschatten',
  description: 'You will never ride alone',
};

export default function RoutePage() {
  return (
    <div className={styles.wrapper}>
      <h1>Get your fastest route here</h1>
      <Map />
      <h2>Find other cyclists with a similar route</h2>
    </div>
  );
}
