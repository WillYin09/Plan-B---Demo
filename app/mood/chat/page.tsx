"use client";
import React, { useRef, useEffect, useState } from "react";

const messages = [
  { role: "user", text: "我最近总是失眠…" },
  { role: "ai", text: "我能理解你。最近有没有特别让你焦虑的事情？" },
  { role: "user", text: "可能是还没找到新工作吧…" },
  { role: "ai", text: "换工作的过程确实不容易，我们可以先把注意力放在能控制的小目标上。" },
];

export default function MoodChat() {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // 保持聊天区域滚动到底部
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#f7f7fa]">
      <div className="max-w-md mx-auto py-6 px-2 flex flex-col h-screen">
        {/* 顶部插画与问候 */}
        <div>
          <div className="flex justify-center mb-4">
            <img
              src="https://placehold.co/320x120?text=情绪插画"
              alt="情绪插画"
              className="rounded-xl shadow bg-white w-80 h-32 object-contain"
            />
          </div>
          <div className="text-center text-lg font-semibold text-gray-800 mb-2">
            我们可能都经历过低谷，试试这些方法缓一缓吧
          </div>
        </div>

        {/* 聊天区域 */}
        <div className="flex-1 overflow-y-auto space-y-3 py-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "ai" && (
                <span className="mr-2 text-2xl self-end">🤖</span>
              )}
              <div
                className={`px-4 py-2 rounded-xl max-w-[75%] text-base shadow 
                  ${
                    msg.role === "user"
                      ? "bg-orange-100 text-orange-900"
                      : "bg-gray-100 text-gray-700"
                  }`}
              >
                {msg.text}
              </div>
              {msg.role === "user" && (
                <span className="ml-2 text-2xl self-end">🧑</span>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* 其它功能入口 */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center bg-blue-50 rounded-xl p-3 shadow">
            <span className="mr-3 text-xl">🌬️</span>
            <div className="flex-1 text-sm">
              3分钟冥想练习，帮助你放松
            </div>
            <a
              href="/mood/breath"
              className="ml-3 px-3 py-1 rounded bg-orange-400 text-white text-sm font-medium hover:opacity-90"
            >
              去冥想
            </a>
          </div>
          <div className="flex items-center bg-purple-50 rounded-xl p-3 shadow">
            <span className="mr-3 text-xl">👥</span>
            <div className="flex-1 text-sm">
              加入匿名社群，获得陪伴与分享
            </div>
            <a
              href="/mood/group"
              className="ml-3 px-3 py-1 rounded bg-orange-400 text-white text-sm font-medium hover:opacity-90"
            >
              加入群聊
            </a>
          </div>
        </div>

        {/* 底部输入栏 */}
        <div className="flex gap-2 mt-2">
          <textarea
            className="flex-1 rounded-xl border border-gray-200 p-3 shadow resize-none focus:outline-none"
            placeholder="说说你的想法…"
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled
          />
          <button
            className="px-5 py-2 rounded-xl bg-orange-500 text-white font-semibold shadow hover:opacity-90"
            disabled
          >
            发送
          </button>
        </div>
        {/* 可根据需要将 disabled 移除并实现交互 */}
      </div>
    </div>
  );
}
