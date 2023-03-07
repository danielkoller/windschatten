'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { districts } from '../../../database/districts.ts';
import { RegisterResponseBody } from '../../api/(auth)/register/route';
import styles from './page.module.scss';

export default function RegisterForm(props: { returnTo?: string | string[] }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [homeDistrict, setHomeDistrict] = useState('');
  const [workDistrict, setWorkDistrict] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        homeDistrict,
        workDistrict,
      }),
    });
    const data: RegisterResponseBody = await response.json();

    if ('errors' in data) {
      // Show error message using react-hot-toast
      data.errors.forEach((error) => {
        toast.error(error.message);
      });
      return;
    }

    if (
      props.returnTo &&
      !Array.isArray(props.returnTo) &&
      // This is checking that the return to is a valid path in your application and not going to a different domain
      /^\/[a-zA-Z0-9-?=/]*$/.test(props.returnTo)
    ) {
      router.push(props.returnTo);
      return;
    }

    // Show success message using react-hot-toast
    toast.success('Registration successful');
    router.replace(`/profile/${data.user.username}`);
    router.refresh();
  };

  return (
    <div>
      <Toaster />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Where do you live?
            <select
              value={homeDistrict}
              onChange={(event) => setHomeDistrict(event.currentTarget.value)}
            >
              <option value="">Select a district</option>
              {districts.map((district) => (
                <option key={`districts-${district.id}`} value={district.value}>
                  {district.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Where do you work?
            <select
              value={workDistrict}
              onChange={(event) => setWorkDistrict(event.currentTarget.value)}
            >
              <option value="">Select a district</option>
              {districts.map((district) => (
                <option key={`districts-${district.id}`} value={district.value}>
                  {district.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button className="btn btm-primary">Register</button>
      </form>
    </div>
  );
}
