import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import {
  faBicycle,
  faComments,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      <div className="hero pt-12 pb-6 min-h-screen">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="hero-content text-left">
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
                  schedules, encouraging eco-friendly transportation and
                  community building.
                </p>
                <Link href="/registration" className="btn">
                  Get started
                </Link>
              </div>
            </div>
            <div className="px-4 md:px-0">
              <Image
                src="/screenshot.png"
                alt="Windschatten app screenshot"
                width={600}
                height={600}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      <section className="container mx-auto p-6">
        <h2 className="text-4xl font-bold text-center mt-6 mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card bordered shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="card-body">
              <FontAwesomeIcon icon={faBicycle} className="text-4xl mb-4" />
              <h2 className="card-title">Find Routes</h2>
              <p>
                Discover the best bicycle routes to work and home, tailored to
                your preferences.
              </p>
            </div>
          </div>
          <div className="card bordered shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="card-body">
              <FontAwesomeIcon icon={faUsers} className="text-4xl mb-4" />
              <h2 className="card-title">Connect with Cyclists</h2>
              <p>
                Find commuting partners with similar routes and schedules to
                make your ride more enjoyable.
              </p>
            </div>
          </div>
          <div className="card bordered shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="card-body">
              <FontAwesomeIcon icon={faComments} className="text-4xl mb-4" />

              <h2 className="card-title">Share your Experience</h2>
              <p>
                Share your experiences with other cyclists and help them find
                the best routes.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center mb-12">
          What People Say About Windschatten
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="testimonial rounded-lg ">
            <Image
              src="/Avatar 1.jpg"
              alt="Anna S."
              width={100}
              height={100}
              className="rounded-full mb-4"
            />
            <p className="mb-6">
              "Windschatten has made my daily commute so much more enjoyable. I
              found new friends to ride with and discovered better routes to
              avoid traffic. Highly recommended!"
            </p>
            <h4 className="font-bold text-xl">Anna S.</h4>
            <p className="text-gray-500">Daily Commuter</p>
          </div>
          <div className="testimonial rounded-lg">
            <Image
              src="/Avatar 2.jpg"
              alt="Michael B."
              width={100}
              height={100}
              className="rounded-full mb-4"
            />
            <p className="mb-6">
              "I was hesitant to start cycling to work, but Windschatten made it
              easy to find a group of people to ride with. Now, I look forward
              to my daily rides!"
            </p>
            <h4 className="font-bold text-xl">Michael B.</h4>
            <p className="text-gray-500">New Cyclist</p>
          </div>
          <div className="testimonial rounded-lg">
            <Image
              src="/Avatar 3.jpg"
              alt="Julia K."
              width={100}
              height={100}
              className="rounded-full mb-4"
            />
            <p className="mb-6">
              "As a long-time cyclist, I thought I knew all the best routes in
              Vienna. Windschatten showed me new paths and connected me with
              other cyclists. It's a game changer!"
            </p>
            <h4 className="font-bold text-xl">Julia K.</h4>
            <p className="text-gray-500">Experienced Cyclist</p>
          </div>
        </div>
      </section>
    </main>
  );
}
