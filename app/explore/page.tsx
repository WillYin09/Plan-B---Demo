// app/explore.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SectionTitle } from "../components/SectionTitle";
import { ExploreCard } from "../components/ExploreCard";

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

const staggerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Explore() {
  const [tab, setTab] = useState("share");
  const router = useRouter();

  // 只显示当前分类
  const filtered = posts.filter((p) =>
    tab === "hot" ? p.type === "hot" : p.type === tab
  );

  return (
    <div className="max-w-md mx-auto py-6 px-4 min-h-screen bg-[#f7f7fa]">
      <SectionTitle title="内容广场" subtitle="发现和分享职业过渡期的经验" showBack />
      
      {/* 顶部插画+文案 */}
      <motion.div 
        className="relative w-full h-40 mb-8 overflow-hidden rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary-500 opacity-80"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          <h2 className="text-2xl font-bold mb-2">一起分享经历</h2>
          <p className="text-center text-sm opacity-90">你的故事，可能正在帮别人走出困境</p>
        </div>
      </motion.div>
      
      {/* 分类Tab */}
      <div className="flex justify-center mb-6">
        {TABS.map((t) => (
          <motion.button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`px-5 py-2 mx-1 rounded-full font-medium transition-all ${
              tab === t.value
                ? "bg-primary text-white shadow"
                : "bg-white text-gray-700 hover:bg-secondary-50 border border-gray-200"
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.label}
          </motion.button>
        ))}
      </div>
      
      {/* 创建帖子按钮 */}
      <motion.button
        className="w-full py-3 mb-6 rounded-xl bg-primary text-white font-medium shadow flex items-center justify-center gap-2"
        onClick={() => router.push('/explore/create')}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <span>✍️</span>
        <span>分享我的经历</span>
      </motion.button>
      
      {/* 内容卡片 */}
      <motion.div 
        className="space-y-5"
        variants={staggerAnimation}
        initial="hidden"
        animate="show"
      >
        {filtered.length === 0 && (
          <div className="text-gray-400 text-center py-8">暂无内容</div>
        )}
        {filtered.map((post) => (
          <motion.div key={post.id} variants={itemAnimation}>
            <ExploreCard
              id={post.id}
              title={post.title}
              author={post.author}
              tags={post.tags}
              type={post.type}
              onClick={(id) => router.push(`/explore/${id}`)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
