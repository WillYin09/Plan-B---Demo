// app/explore.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// mock 分类
const TABS = [
  { label: "分享经验", value: "share" },
  { label: "提问", value: "question" },
  { label: "热门主题", value: "hot" },
];

// mock 帖子数据
const posts = [
  {
    id: "1",
    title: "我在失业时坚持写作",
    author: "匿名",
    tags: ["情绪支持", "坚持"],
    type: "share",
  },
  {
    id: "2",
    title: "如何30天找到新工作",
    author: "小黎",
    tags: ["求职", "方法论"],
    type: "share",
  },
  {
    id: "3",
    title: "失业保险怎么申领？",
    author: "蓝天",
    tags: ["提问", "失业金"],
    type: "question",
  },
  {
    id: "4",
    title: "北京地区失业政策合集",
    author: "匿名",
    tags: ["热门", "政策"],
    type: "hot",
  },
];

export default function Explore() {
  const [tab, setTab] = useState("share");
  const router = useRouter();

  // 只显示当前分类
  const filtered = posts.filter((p) =>
    tab === "hot" ? p.type === "hot" : p.type === tab
  );

  return (
    <div className="max-w-md mx-auto py-6 px-4 min-h-screen bg-[#f7f7fa]">
      {/* 返回按钮 */}
      <button
          onClick={() => router.back()}
          className="mb-4 text-gray-400 hover:text-gray-700 transition"
        >
          ← 返回
        </button>
      {/* 顶部插画+文案 */}
      <div className="flex flex-col items-center mb-4">
        <img
          src="https://placehold.co/320x120?text=内容广场"
          alt="插画"
          className="rounded-xl shadow bg-white w-80 h-32 object-contain mb-2"
        />
        <div className="font-bold text-lg text-center">
          你的故事，可能正在帮别人走出困境
        </div>
      </div>
      {/* 分类Tab */}
      <div className="flex space-x-2 mb-4 justify-center">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              tab === t.value
                ? "bg-orange-500 text-white shadow"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* 内容卡片 */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="text-gray-400 text-center py-8">暂无内容</div>
        )}
        {filtered.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col"
          >
            <div className="font-semibold text-base mb-1">{post.title}</div>
            <div className="text-xs text-gray-400 mb-2">by {post.author}</div>
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-xs px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <button
              className="self-end px-4 py-2 rounded bg-orange-500 text-white font-medium hover:opacity-90 transition"
              onClick={() => router.push(`/explore/${post.id}`)}
            >
              查看详情
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
