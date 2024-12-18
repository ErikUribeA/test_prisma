'use client'
import { useEffect, useState } from "react";

interface IPosts {
  id: number;
  title: string;
  content: string;
}

export default function Home() {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    });
    const data = await res.json();
    setPosts((prev) => [...prev, data]);
    setNewPost({ title: '', content: '' });
  };

  return (
    <main className="grid grid-cols-2 justify-center w-full mt-5 ">
      <div className="flex flex-col items-center">
        <h1>Posts</h1>
        <ul className="flex flex-col gap-3">
          {posts.map((post) => (
            <li key={post.id} className="border-2 border-blue-400 p-4 rounded-lg">
              <h2 className="text-2xl">{post.title}</h2>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 items-center">
        <input
          className="text-black"
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          className="text-black"
          placeholder="Content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <button type="submit">Create Post</button>
      </form>
    </main>
  );
}
