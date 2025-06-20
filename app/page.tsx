"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./hooks/useAuth";
import { motion, Variants } from "framer-motion";

import {
  FaUserCircle,
  FaCog,
  FaSearch,
  FaFire,
  FaFileAlt,
  FaSmile,
  FaComments,
  FaCalendarCheck,
} from "react-icons/fa";
import { BiTestTube } from "react-icons/bi";

// 仅用于底部导航/顶部tab
const TABS = [
  { key: "onboarding", label: "启程问答", icon: <FaFire size={18} /> },
  { key: "policy", label: "政策资源", icon: <FaFileAlt size={18} /> },
  { key: "mood", label: "心情小站", icon: <FaSmile size={18} /> },
  { key: "explore", label: "交流广场", icon: <FaComments size={18} /> },
  { key: "lab", label: "探索实验室", icon: <BiTestTube size={18} />, route: "/lab/multimodal" },
];

// 首页功能区（不含启动问答，含每日打卡）
const FEATURES = [
  { key: "policy", label: "政策资源", icon: <FaFileAlt size={22} />, desc: "了解城市支持", color: "bg-blue-100" },
  { key: "mood", label: "心情小站", icon: <FaSmile size={22} />, desc: "温柔地陪伴你", color: "bg-pink-100" },
  { key: "explore", label: "交流广场", icon: <FaComments size={22} />, desc: "同路人的分享", color: "bg-green-100" },
  { key: "checkin", label: "今日小记", icon: <FaCalendarCheck size={22} />, desc: "记录心情与收获", color: "bg-yellow-100" },
  { key: "lab", label: "探索实验室", icon: <BiTestTube size={22} />, desc: "用声音表达心情", color: "bg-purple-100", route: "/lab/multimodal" },
];

export default function Home() {
  const router = useRouter();
  const { isAuthed, username } = useAuth();

  // 首次访问时跳转到 welcome 页
  useEffect(() => {
    const visited = localStorage.getItem("hasVisited");
    if (!visited) {
      router.push("/welcome");
    }
  }, []);

  // Card animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      } 
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 flex flex-col items-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 顶部栏 */}
      <div className="w-full max-w-md flex justify-between items-center py-4 px-4 bg-white shadow-md rounded-b-xl sticky top-0 z-10">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push(isAuthed ? "/user" : "/welcome")}
        >
          <FaUserCircle size={32} className="text-gray-400 mr-2" />
          <span className="text-xl font-bold text-gray-800">
            {isAuthed ? `你好，${username}` : "欢迎来访，点此开始"}
          </span>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/user")}
          className="text-gray-400 hover:text-primary-500 transition-all"
        >
          <FaCog size={24} />
        </motion.button>
      </div>

      {/* 欢迎语 */}
      <div className="w-full max-w-md px-4 mt-5">
        <motion.p 
          className="text-gray-500 text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          欢迎来到 Restart Guide，一起探索温柔的重启之旅
        </motion.p>
      </div>

      {/* 搜索栏 */}
      <div className="w-full max-w-md px-4 mt-3 mb-4">
        <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 shadow-soft transition-all focus-within:ring-2 focus-within:ring-primary-300">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-base"
            placeholder="想了解些什么？"
            readOnly
          />
        </div>
      </div>

      {/* 启动问答区（单独卡片/按钮） */}
      <div className="w-full max-w-md px-4 mb-5">
        <motion.div
          className="rounded-xl shadow-md p-6 min-h-[70px] flex items-center justify-between cursor-pointer bg-primary-100 border border-primary-200 hover:shadow-lg transition-all"
          onClick={() => router.push("/onboarding")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center">
            <FaFire size={22} className="text-primary-500 mr-3" />
            <span className="font-bold text-lg text-primary-800">启程问答</span>
          </div>
          <span className="text-xs text-gray-500">了解你现在的状态</span>
        </motion.div>
      </div>

      {/* 功能区：2x2 卡片网格 */}
      <motion.div 
        className="w-full max-w-md grid grid-cols-2 gap-4 px-4 mb-24"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {FEATURES.map((feature) => (
          <motion.div
            key={feature.key}
            variants={item}
            className={`rounded-xl shadow-md p-6 min-h-[100px] flex flex-col justify-between
              cursor-pointer hover:shadow-lg transition-all border border-transparent
              ${feature.color}`}
            onClick={() => router.push(feature.route || `/${feature.key}`)}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">{feature.icon}</span>
              <span className="font-bold text-lg">{feature.label}</span>
            </div>
            <span className="text-sm text-gray-600">
              {feature.desc}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* 底部导航栏 */}
      <div
        className="fixed bottom-0 left-0 w-full max-w-md flex justify-around items-center py-3 bg-white border-t z-20 rounded-t-xl shadow-lg mx-auto"
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        {TABS.map((tab, i) => (
          <motion.button
            key={tab.key}
            className="flex flex-col items-center text-xs px-2 transition-all text-gray-500 hover:text-primary-500"
            onClick={() => router.push(tab.route || `/${tab.key}`)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{tab.icon}</span>
            <span className="mt-1">{tab.label}</span>
          </motion.button>
        ))}
        <motion.button
          className="flex flex-col items-center text-xs px-2 text-gray-500 hover:text-primary-500"
          onClick={() => router.push(isAuthed ? "/user" : "/welcome")}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaUserCircle size={18} />
          <span className="mt-1">我的空间</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
