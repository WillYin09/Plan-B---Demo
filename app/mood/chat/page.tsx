"use client";
import React, { useRef, useEffect, useState } from "react";

interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

export default function MoodChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "ai", text: "你好呀，我是你的情绪陪伴者，今天想聊点什么呢？" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages: ChatMessage[] = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "你是一个温柔的情绪陪伴者。" },
            ...newMessages.map((m) => ({
              role: m.role === "user" ? "user" : "assistant", // 只在API请求时转义
              content: m.text,
            })),
          ],
        }),
      });

      const data = await res.json();
      const aiText =
        data.choices?.[0]?.message?.content ||
        "抱歉，我刚刚没听清，你可以再说一遍吗？";
      setMessages([...newMessages, { role: "ai", text: aiText }]);
    } catch (err) {
      setMessages([...newMessages, { role: "ai", text: "出错啦，请稍后再试试～" }]);
    } finally {
      setLoading(false);
    }
  };

  // 支持按回车发送
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7fa]">
      <div className="max-w-md mx-auto py-6 px-2 flex flex-col h-screen">
        {/* 插画与提示语 */}
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

        {/* 聊天展示 */}
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

        {/* 冥想 & 群组 */}
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

        {/* 输入栏 */}
        <div className="flex gap-2 mt-2">
          <textarea
            className="flex-1 rounded-xl border border-gray-200 p-3 shadow resize-none focus:outline-none"
            placeholder="说说你的想法…"
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            className="px-5 py-2 rounded-xl bg-orange-500 text-white font-semibold shadow hover:opacity-90"
            disabled={loading}
          >
            {loading ? "发送中…" : "发送"}
          </button>
        </div>
      </div>
    </div>
  );
}
