// app/user/questions.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const tabs = [
  { key: "posts", label: "我发布的经验" },
  { key: "questions", label: "我的提问" },
  { key: "favorites", label: "我的收藏" },
];

// mock 数据
const myPosts = [
  {
    id: 1,
    title: "我在焦虑时写下的自救日记",
    date: "2024-06-08",
    tags: ["情绪支持"],
  },
  {
    id: 2,
    title: "如何避免信息焦虑？",
    date: "2024-06-05",
    tags: ["提问", "心理"],
  },
];

const myQuestions = [
  {
    id: 3,
    title: "失业期间怎么保持自信？",
    date: "2024-06-02",
    tags: ["求助", "情绪"],
  },
  {
    id: 4,
    title: "医保断缴会有什么影响？",
    date: "2024-06-01",
    tags: ["提问", "社保"],
  },
];

const myFavorites = [
  {
    id: 5,
    title: "我在失业时坚持写作",
    date: "2024-05-29",
    tags: ["坚持", "经验"],
  },
];

const tabDataMap: Record<string, typeof myPosts> = {
  posts: myPosts,
  questions: myQuestions,
  favorites: myFavorites,
};

export default function MyQuestionsPage() {
  const [activeTab, setActiveTab] = useState("posts");
  const router = useRouter();
  const list = tabDataMap[activeTab] || [];

  return (
    <div className="min-h-screen bg-[#f7f7fa] max-w-md mx-auto py-8 px-4">
      {/* 标题 */}
      <div className="text-xl font-bold mb-6">我的内容记录</div>
      {/* Tab 切换 */}
      <div className="flex space-x-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-3 py-1 rounded-full font-medium transition
              ${activeTab === tab.key
                ? "bg-orange-500 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-orange-100"
              }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 内容列表 */}
      <div className="space-y-4">
        {list.length === 0 ? (
          <div className="text-center text-gray-400 py-10">暂无相关内容</div>
        ) : (
          list.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-4 flex flex-col space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{item.title}</span>
                <span className="text-xs text-gray-400">{item.date}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-xs px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <button
                className="self-end bg-orange-500 text-white px-4 py-1 rounded hover:opacity-90 mt-2"
                onClick={() => router.push(`/explore/${item.id}`)}
              >
                查看详情
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
