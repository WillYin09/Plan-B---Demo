"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SectionTitle } from "../components/SectionTitle";
import { SuggestionCard } from "../components/SuggestionCard";
import { FaMicrophone, FaBookOpen, FaLaptopCode, FaPenFancy, FaSearch, FaLightbulb, FaCommentDots, FaRocket, FaCompass } from "react-icons/fa";

// 机会卡片数据
const opportunityCards = [
  {
    icon: <FaMicrophone size={20} />,
    title: "开设一档播客，分享你的故事",
    desc: "通过声音记录和分享你的经历，可能帮助更多同路人走出迷茫。",
    type: "podcast"
  },
  {
    icon: <FaBookOpen size={20} />,
    title: "兼职远程心理陪伴志愿者",
    desc: "你的经历和共情能力，对于其他人来说是珍贵的支持和指引。",
    type: "volunteer"
  },
  {
    icon: <FaLaptopCode size={20} />,
    title: "接受AI训练，成为自由职业的Prompt设计师",
    desc: "掌握与AI共舞的技能，创造灵活的工作方式和收入来源。",
    type: "ai"
  },
  {
    icon: <FaPenFancy size={20} />,
    title: "整理你的gap经历，成为付费内容或课程",
    desc: "将你的经验转化为知识产品，帮助他人也实现自我价值。",
    type: "content"
  }
];

// 方向偏好选项
const explorationOptions = [
  { id: "side", icon: "🔍", label: "找副业" },
  { id: "transition", icon: "💡", label: "转型方向" },
  { id: "freelance", icon: "💬", label: "自由职业" },
  { id: "startup", icon: "🚀", label: "创业灵感" }
];

export default function ExploreOpportunitiesPage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // 处理收藏
  const handleBookmark = (type: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(type)) {
        newSet.delete(type);
      } else {
        newSet.add(type);
      }
      return newSet;
    });
  };

  // 处理选项点击
  const handleOptionClick = (id: string) => {
    setSelectedOption(id);
    // 这里只是模拟选择，实际上没有执行API调用
    setTimeout(() => {
      setSelectedOption(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f7f7fa] flex flex-col items-center px-3 py-6">
      <div className="w-full max-w-md mx-auto">
        <SectionTitle 
          title="机会探索" 
          subtitle="灵感一闪，或许你已站在下一站的起点。" 
          showBack 
        />

        {/* 顶部插画 */}
        <motion.div 
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full h-48 mb-5 overflow-hidden rounded-2xl shadow-lg bg-indigo-100 flex items-center justify-center">
            <div className="flex flex-col items-center text-indigo-700">
              <FaCompass size={48} className="mb-3 opacity-70" />
              <div className="text-xl font-semibold">探索未来方向</div>
            </div>
          </div>
        </motion.div>

        {/* 灵感卡片区域 */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">发现可能性</h3>
          
          {opportunityCards.map((card, index) => (
            <motion.div
              key={card.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <SuggestionCard 
                agent={card.title}
                content={card.desc}
                agentType="coach"
                bookmarked={favorites.has(card.type)}
                onBookmark={() => handleBookmark(card.type)}
              />
            </motion.div>
          ))}
        </div>

        {/* 轻交互区域 */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">我还想探索...</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {explorationOptions.map((option) => (
              <motion.button
                key={option.id}
                className={`rounded-xl px-4 py-3 text-base font-medium shadow transition
                  ${selectedOption === option.id 
                    ? "bg-primary-100 border-2 border-primary text-primary-700" 
                    : "bg-white hover:bg-gray-50 text-gray-700"
                  }`}
                onClick={() => handleOptionClick(option.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="mr-2">{option.icon}</span>
                {option.label}
              </motion.button>
            ))}
          </div>
          
          {selectedOption && (
            <div className="mt-4 text-center text-gray-500 animate-pulse">
              正在为你寻找更多 {explorationOptions.find(o => o.id === selectedOption)?.label} 的灵感...
            </div>
          )}
        </div>

        {/* 底部提示 */}
        <motion.div
          className="text-center text-gray-500 mt-8 mb-4 px-6 py-4 bg-gray-50 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          🌱 所有灵感都不是任务，只是陪你发掘可能的下一站。
        </motion.div>
      </div>
    </div>
  );
} 