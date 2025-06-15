// app/explore/create.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TAG_OPTIONS = [
  "情绪支持", "找工作", "坚持", "求职", "反思", "成长"
];

export default function ExploreCreate() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleTagToggle = (tag: string) => {
    setTags(tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 可扩展API，当前仅本地模拟
    setSuccess(true);
    setTimeout(() => {
      router.push("/explore");
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#f7f7fa] py-8 px-4">
      {/* 顶部插画 */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://placehold.co/320x120?text=分享你的故事"
          alt="投稿插画"
          className="rounded-xl shadow bg-white w-80 h-32 object-contain mb-2"
        />
        <div className="font-bold text-lg text-center">
          你的故事，可能正在帮别人走出困境
        </div>
      </div>
      {/* 投稿表单 */}
      <form
        className="bg-white rounded-xl shadow-md p-6 space-y-4"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full rounded-lg border border-gray-200 p-3 text-base mb-1"
          placeholder="请输入标题（如：我在焦虑时做了这件事）"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full rounded-lg border border-gray-200 p-3 text-base h-32 resize-none mb-1"
          placeholder="写下你的经历、反思、鼓励等"
          value={body}
          onChange={e => setBody(e.target.value)}
          required
        />
        {/* 标签选择 */}
        <div>
          <div className="font-medium mb-2">选择标签</div>
          <div className="flex flex-wrap gap-2">
            {TAG_OPTIONS.map(tag => (
              <button
                type="button"
                key={tag}
                className={`px-3 py-1 rounded-full border transition
                  ${
                    tags.includes(tag)
                      ? "bg-orange-100 border-orange-400 text-orange-600"
                      : "bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200"
                  }`}
                onClick={() => handleTagToggle(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
        {/* 提交 */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold shadow hover:opacity-90 transition"
        >
          发布内容
        </button>
        {success && (
          <div className="text-center text-green-500 mt-2 font-bold">
            🎉 发布成功，正在返回内容广场...
          </div>
        )}
      </form>
    </div>
  );
}
