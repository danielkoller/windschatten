import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';

export const metadata = {
  title: 'Windschatten',
  description: 'You will never ride alone',
};

export default function Home() {
  return (
    <main>
      <div className={styles.hero}>
        <Image
          src="/images/Logo.png"
          alt="The Logo is a bike with the name Windschatten beside it"
          width={400}
          height={400}
        />
        <p>
          Windschatten is an app that helps cyclists in Vienna find commuting
          partners. It connects people with similar routes and schedules,
          encouraging eco-friendly transportation and community building.
        </p>
        <Link href="/registration">
          <button className="btn">Get Started</button>
        </Link>
      </div>
    </main>
  );
}
