'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { RegisterResponseBody } from '../../api/(auth)/register/route';
import styles from './page.module.scss';

export default function LoginForm(props: { returnTo?: string | string[] }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
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
    toast.success('Login successful');
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
              className="input input-bordered w-full max-w-xs"
              placeholder="Enter your username here"
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              className="input input-bordered w-full max-w-xs"
              placeholder="Enter your password here"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </label>
        </div>
        <button className="btn btm-primary">Login</button>
      </form>
    </div>
  );
}
