"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./hooks/useAuth";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  FaUserCircle,
  FaCog,
  FaSearch,
  FaFileAlt,
  FaSmile,
  FaComments,
  FaCalendarCheck,
  FaCompass,
  FaFire
} from "react-icons/fa";
import { BiTestTube } from "react-icons/bi";

/* ------------------------------ 常量 ------------------------------ */

const TABS = [
  { key: "policy", label: "政策资源", icon: <FaFileAlt size={18} /> },
  { key: "mood", label: "心情小站", icon: <FaSmile size={18} /> },
  { key: "explore", label: "交流广场", icon: <FaComments size={18} /> },
  { key: "checkin", label: "今日小记", icon: <FaCalendarCheck size={18} /> },
  { key: "lab", label: "探索实验室", icon: <BiTestTube size={18} />, route: "/lab/multimodal" },
  { key: "explore-opportunities", label: "机会探索", icon: <FaCompass size={18} /> },
];

const FEATURES = [
  { key: "policy", label: "政策资源", icon: <FaFileAlt size={22} />, desc: "了解城市支持", color: "bg-blue-100/90" },
  { key: "mood", label: "心情小站", icon: <FaSmile size={22} />, desc: "温柔地陪伴你", color: "bg-pink-100/90" },
  { key: "explore", label: "交流广场", icon: <FaComments size={22} />, desc: "同路人的分享", color: "bg-green-100/90" },
  { key: "checkin", label: "今日小记", icon: <FaCalendarCheck size={22} />, desc: "记录心情与收获", color: "bg-yellow-100/90" },
  { key: "lab", label: "探索实验室", icon: <BiTestTube size={22} />, desc: "用声音表达心情", color: "bg-purple-100/90", route: "/lab/multimodal" },
  { key: "explore-opportunities", label: "机会探索", icon: <FaCompass size={22} />, desc: "发现职业可能", color: "bg-indigo-100/90" },
];

/* ------------------------------ 动画 ------------------------------ */

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

/* ------------------------------ 组件 ------------------------------ */

export default function Home() {
  const router = useRouter();
  const { isAuthed, username } = useAuth();

  useEffect(() => {
    if (!localStorage.getItem("hasVisited")) router.push("/welcome");
  }, []);

  return (
    <motion.div className="min-h-screen w-full flex flex-col items-center justify-center bg-white relative">
      {/* 顶部栏 */}
      <div className="w-full max-w-md sticky top-0 z-20 py-4 px-4 bg-white/90 backdrop-blur-md shadow-md rounded-b-xl flex justify-between items-center mx-auto mt-0">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push(isAuthed ? "/user" : "/welcome")}
        >
          <FaUserCircle size={32} className="mr-2 text-gray-400" />
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

      {/* 主内容区 - 定宽圆角卡片，背景只在卡片内部 */}
      <main className="w-full flex-1 flex flex-col items-center justify-center px-2 py-6">
        <motion.div
          className="relative max-w-md w-full rounded-3xl shadow-2xl overflow-hidden mt-8 mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 背景插画（完全覆盖卡片区域，所有内容都叠加在其上） */}
          <Image
            src="/illustrations/home-hero.jpeg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover z-0"
            priority
          />
          {/* 半透明渐变遮罩，让功能更清晰 */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/80 via-white/70 to-white/90 pointer-events-none" />
          {/* 主内容区，全部浮在背景上 */}
          <div className="relative z-20 px-6 py-7">
            {/* 欢迎语 */}
            <motion.p
              className="text-gray-700 text-base text-center mb-2 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              欢迎来到 Restart Guide，一起探索温柔的重启之旅
            </motion.p>
            {/* 搜索栏 */}
            <div className="w-full my-3">
              <div className="flex items-center bg-gray-100/90 rounded-xl px-3 py-2 shadow transition-all focus-within:border focus-within:border-primary">
                <FaSearch className="mr-2 text-gray-400" />
                <input
                  readOnly
                  placeholder="想了解些什么？"
                  className="flex-1 bg-transparent outline-none text-base"
                />
              </div>
            </div>
            {/* 启程问答 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/onboarding")}
              className="rounded-xl p-6 min-h-[70px] flex items-center justify-between cursor-pointer
                         bg-primary-100/90 border border-primary-200/80 shadow-md hover:shadow-lg transition-all mt-4 mb-4"
            >
              <div className="flex items-center">
                <FaFire size={22} className="mr-3 text-primary-500" />
                <span className="font-bold text-lg text-primary-800">启程问答</span>
              </div>
              <span className="text-xs text-gray-500">了解你现在的状态</span>
            </motion.div>
            {/* 功能卡片 */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="w-full grid gap-4 mt-2 mb-2 grid-cols-[repeat(auto-fit,minmax(160px,1fr))]"
            >
              {FEATURES.map((f) => (
                <motion.div
                  key={f.key}
                  variants={item}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push(f.route || `/${f.key}`)}
                  className={`rounded-xl p-6 min-h-[90px] flex flex-col justify-between cursor-pointer
                            shadow-md border border-transparent hover:shadow-lg transition-all 
                            ${f.color} bg-opacity-90 backdrop-blur-md`}
                >
                  <div className="flex items-center mb-2">
                    <span className="mr-2 text-xl">{f.icon}</span>
                    <span className="font-bold text-lg">{f.label}</span>
                  </div>
                  <span className="text-sm text-gray-600">{f.desc}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center z-30 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-md mx-auto rounded-t-xl shadow-lg bg-white/85 backdrop-blur-md border-t py-3 flex justify-around items-center">
          {TABS.map((tab) => (
            <motion.button
              key={tab.key}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(tab.route || `/${tab.key}`)}
              className="flex flex-col items-center text-xs px-2 text-gray-500 hover:text-primary-500 transition-all"
            >
              {tab.icon}
              <span className="mt-1">{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
