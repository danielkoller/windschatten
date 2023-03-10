'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { RegisterResponseBody } from '../../api/(auth)/register/route';

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
    <div className="hero min-h-min">
      <Toaster />
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="relative w-full max-w-sm">
          <h1 className="text-5xl font-bold mb-8 top-0 left-0 z-10 w-full">
            Login now
          </h1>
          <div className="mb-8 card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label htmlFor="username" className="label">
                    <span className="label-text">Username:</span>
                  </label>
                  <input
                    className="input input-bordered"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.currentTarget.value)}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="password" className="label">
                    <span className="label-text">Password:</span>
                  </label>
                  <input
                    className="input input-bordered"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
