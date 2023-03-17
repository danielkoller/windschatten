import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import Image from 'next/image';
import Link from 'next/link';

// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false;

export const metadata = {
  title: 'Windschatten',
  description:
    'Windschatten is an app that helps cyclists in Vienna find commuting partners. It connects people with similar routes and schedules, encouraging eco-friendly transportation and community building. The app shows you the best route for you to take to work and home by bicycle. You can also see the posts of other users in your district and interact with them. So you will never ride alone again!',
};

export default function Home() {
  return (
    <main>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <Image
              src="/images/Logo.png"
              alt="The Logo is a bike with the name Windschatten beside it"
              width={400}
              height={400}
            />
            <p className="py-6">
              Windschatten is an app that helps cyclists in Vienna find
              commuting partners. It connects people with similar routes and
              schedules, encouraging eco-friendly transportation and community
              building.
            </p>
            <Link href="/registration" className="btn">
              Get started
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
