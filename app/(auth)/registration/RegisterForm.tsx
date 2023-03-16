'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { districts } from '../../../database/districts';
import { RegisterResponseBody } from '../../api/(auth)/register/route';

export default function RegisterForm(props: { returnTo?: string | string[] }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [homeDistrict, setHomeDistrict] = useState('');
  const [workDistrict, setWorkDistrict] = useState('');
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewURL(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setPreviewURL(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements)
      .filter(
        (element) =>
          element instanceof HTMLInputElement && element.type === 'file',
      )
      .pop() as HTMLInputElement | undefined;
    if (fileInput) {
      const formData = new FormData();
      if (fileInput.files !== null) {
        for (const file of fileInput.files) {
          formData.append('file', file);
        }
      }
      formData.append('upload_preset', 'ehdbizqs');

      const picData = await fetch(
        'https://api.cloudinary.com/v1_1/dscaosd5d/image/upload',
        {
          method: 'POST',
          body: formData,
        },
      ).then((r) => r.json());

      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
          homeDistrict,
          workDistrict,
          // Could also be empty string if no image was uploaded
          profilePic: picData.secure_url || '/Cyclist.svg',
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
    }
  };

  return (
    <div className="hero min-h-min">
      <Toaster />
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="relative w-full max-w- mx-auto rounded p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h1 className="text-5xl font-bold mb-8 top-0 left-0 z-10 w-full">
                Register now
              </h1>
              <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
                <div className="card-body">
                  <div className="form-control">
                    <label htmlFor="username" className="label">
                      <span className="label-text">Username:</span>
                    </label>
                    <input
                      className="input input-bordered"
                      id="username"
                      value={username}
                      onChange={(event) =>
                        setUsername(event.currentTarget.value)
                      }
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
                      onChange={(event) =>
                        setPassword(event.currentTarget.value)
                      }
                    />
                  </div>
                  <div className="form-control">
                    <label htmlFor="homeDistrict" className="label">
                      <span className="label-text">Where do you live?</span>
                    </label>
                    <select
                      className="input input-bordered"
                      id="homeDistrict"
                      value={homeDistrict}
                      onChange={(event) =>
                        setHomeDistrict(event.currentTarget.value)
                      }
                    >
                      <option value="">Select a district</option>
                      {districts.map((district) => (
                        <option
                          key={`districts-${district.id}`}
                          value={district.value}
                        >
                          {district.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control">
                    <label htmlFor="workDistrict" className="label">
                      <span className="label-text">Where do you work?</span>
                    </label>
                    <select
                      className="input input-bordered"
                      id="workDistrict"
                      value={workDistrict}
                      onChange={(event) =>
                        setWorkDistrict(event.currentTarget.value)
                      }
                    >
                      <option value="">Select a district</option>
                      {districts.map((district) => (
                        <option
                          key={`districts-${district.id}`}
                          value={district.value}
                        >
                          {district.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control">
                    <label htmlFor="file" className="label">
                      <span className="label-text">Profile picture:</span>
                    </label>
                    <input
                      className="file-input file-input-bordered w-full max-w-xs"
                      type="file"
                      name="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="form-control">
                    <label htmlFor="preview" className="label">
                      <span className="label-text">
                        Profile picture preview:
                      </span>
                    </label>
                    {!!previewURL && (
                      <Image
                        src={previewURL}
                        height={200}
                        width={200}
                        alt="Profile picture preview"
                        className="w-full max-w-xs h-auto"
                      />
                    )}
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn">Register</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
