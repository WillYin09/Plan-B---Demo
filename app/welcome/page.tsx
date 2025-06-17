"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ILLUSTRATION_URL = "/78f0b74b-4289-40a5-a297-ab504ab72a0a.png";

export default function WelcomePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 登录
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("请输入账号和密码");
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-purple-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center">
        {/* 顶部插图 */}
        <div className="w-40 h-28 rounded-2xl bg-orange-100 flex items-center justify-center mb-4 overflow-hidden">
          <img
            src={ILLUSTRATION_URL}
            alt="欢迎插图"
            className="w-full h-full object-cover"
            onError={e => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
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
            这是一个专为人生gap期、职场休息期、情绪波动期设计的一站式心理与行动支持APP。
            <br />
            你可以在这里获得温柔陪伴、定制任务、信息、政策与社区支持。<br />
            无需焦虑，请从容走好每一步～
          </p>
        </div>
        {/* 登录表单 */}
        <form className="w-full flex flex-col items-center mb-2" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="账号"
            className="w-full mb-3 px-4 py-2 border rounded-xl outline-none bg-gray-100"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="密码"
            className="w-full mb-3 px-4 py-2 border rounded-xl outline-none bg-gray-100"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-2xl text-lg shadow mb-2 transition"
          >
            登录 / 注册
          </button>
        </form>
        <button
          className="text-gray-500 text-sm underline"
          onClick={handleSkip}
        >
          跳过，直接体验
        </button>
      </div>
    </div>
  );
}
