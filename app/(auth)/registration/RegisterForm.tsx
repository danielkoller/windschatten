'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { districts } from '../../../database/districts.ts';
import { RegisterResponseBody } from '../../api/(auth)/register/route';
import styles from './page.module.scss';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [homeDistrict, setHomeDistrict] = useState('');
  const [workDistrict, setWorkDistrict] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <form
      className={styles.form}
      onSubmit={async (event) => {
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
          setErrors(data.errors);
          return;
        }
        router.push('/route');
      }}
    >
      {errors.map((error) => (
        <div key={`error-${error.message}`}>Error: {error.message}</div>
      ))}
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
      <button className={styles.registerButton}>Register</button>
    </form>
  );
}
