// app/explore/[id]/page.tsx
"use client";
import { useRouter, useParams } from "next/navigation";
import React from "react";

// 假数据，可扩展
const mockPosts = [
  {
    id: "1",
    title: "我在失业时坚持写作",
    author: "匿名",
    tags: ["情绪支持", "坚持"],
    body: [
      "失业后的第一周，我感到完全迷茫，每天无所事事。",
      "我决定从写作开始，每天写200字，记录我的状态。",
      "这个小小的仪式感让我逐渐找回节奏，也得到了朋友的鼓励。"
    ]
  },
  {
    id: "2",
    title: "如何30天找到新工作",
    author: "小黎",
    tags: ["求职", "方法论"],
    body: [
      "设定目标，每天递交5份简历。",
      "坚持信息整理和面试复盘。",
      "和朋友多交流经验，保持信心。"
    ]
  }
];

export default function ExploreDetail() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };

  // 查找当前帖子
  const post =
    mockPosts.find((item) => item.id === (Array.isArray(id) ? id[0] : id)) ||
    mockPosts[0];

  return (
    <div className="max-w-md mx-auto min-h-screen py-6 px-4 bg-[#f7f7fa]">
      {/* 顶部插画+标题 */}
      <div className="flex flex-col items-center mb-4">
        <img
          src="https://placehold.co/320x120?text=内容详情"
          alt="插画"
          className="rounded-xl shadow bg-white w-80 h-32 object-contain mb-2"
        />
        <div className="font-bold text-xl text-center">{post.title}</div>
      </div>
      {/* 作者+标签 */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-500">by {post.author}</div>
        <div className="flex gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-xs px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      {/* 正文 */}
      <div className="bg-white shadow p-6 rounded space-y-3 mb-6">
        {post.body.map((para, idx) => (
          <div key={idx} className="text-sm leading-relaxed">
            {para}
          </div>
        ))}
      </div>
      {/* 行为按钮 */}
      <div className="flex justify-between items-center mb-6 space-x-3">
        <button className="text-xl" title="点赞">👍</button>
        <button className="text-xl" title="收藏">⭐</button>
        <button className="text-xl" title="评论">💬</button>
        <button
          className="flex-1 bg-orange-500 text-white py-2 rounded-xl font-bold ml-4 hover:opacity-90"
          onClick={() => router.push("/explore")}
        >
          返回内容广场
        </button>
      </div>
    </div>
  );
}
