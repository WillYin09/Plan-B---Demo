"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function WelcomePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 登录
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("需要填写账号和密码才能继续哦");
      return;
    }
    localStorage.setItem("hasVisited", "true");
    localStorage.setItem("isAuthed", "true");
    localStorage.setItem("username", username);
    router.push("/"); // 登录后进主页
  };

  // 跳过
  const handleSkip = () => {
    localStorage.setItem("hasVisited", "true");
    router.push("/onboarding"); // 跳 onboarding
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-secondary-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center">
        {/* 顶部插图 */}
        <div className="w-64 h-48 mb-4 overflow-hidden">
          <Image
            src="/illustrations/welcome.jpeg"
            alt="欢迎插图"
            width={280}
            height={200}
            priority
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="font-bold text-xl tracking-wider text-gray-700 mb-2 text-center">
          Restart Guide · 重启指南
        </div>
        {/* APP简短介绍 */}
        <div className="w-full flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            生活暂停，不代表你被定义。
          </h1>
          <p className="text-base text-gray-600 text-center mb-2">
            这是一个专为你人生的缓步期、职场的喘息期、情绪的平复期设计的心灵陪伴空间。
            <br />
            你可以在这里获得陪伴、任务、信息与喘息。<br />
            让我们慢慢来，一起探索下一步的可能～
          </p>
        </div>
        {/* 登录表单 */}
        <form className="w-full flex flex-col items-center mb-2" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="给自己起个昵称吧"
            className="w-full mb-3 px-4 py-2 border rounded-xl outline-none bg-gray-100 focus:ring-2 focus:ring-primary-300"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="设置个密码，保护你的小天地"
            className="w-full mb-3 px-4 py-2 border rounded-xl outline-none bg-gray-100 focus:ring-2 focus:ring-primary-300"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <button
            type="submit"
            className="w-full bg-primary-400 hover:bg-primary-500 text-white font-semibold py-2 rounded-2xl text-lg shadow mb-2 transition"
          >
            进入我的旅程
          </button>
        </form>
        <button
          className="text-gray-500 text-sm underline"
          onClick={handleSkip}
        >
          稍后再决定，现在先看看
        </button>
      </div>
    </div>
  );
}
