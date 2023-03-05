'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { districts } from '../../../database/districts.ts';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [homeDistrict, setHomeDistrict] = useState('');
  const [workDistrict, setWorkDistrict] = useState('');
  const router = useRouter();
  return (
    <form
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
        router.push('/');
      }}
    >
      <label>
        Username:
        <input
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </label>
      <label>
        Password:
        <input
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
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
      <label>
        Where do you work?
        <select
          value={workDistrict}
          onChange={(event) => setWorkDistrict(event.currentTarget.value)}
        >
          <option value="">Select a district</option>{' '}
          {districts.map((district) => (
            <option key={`districts-${district.id}`} value={district.value}>
              {district.label}
            </option>
          ))}
        </select>
      </label>
      <button>Register</button>
    </form>
  );
}
