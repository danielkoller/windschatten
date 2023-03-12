'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { PostResponseBodyPost } from '../api/posts/route';

export default function Forum() {
  const [content, setContent] = useState('');
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    const data: PostResponseBodyPost = await response.json();

    if ('errors' in data) {
      // Show error message using react-hot-toast
      data.errors.forEach((error) => {
        toast.error(error.message);
      });
      return;
    }

    // Show success message using react-hot-toast
    toast.success('Posting added');
    router.refresh();
    setContent('');
  }

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <label>
          Content:
          <input
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </label>
        <button>Create Post</button>
      </form>
    </div>
  );
}
