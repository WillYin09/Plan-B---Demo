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
  FaFire,
  FaFileAlt,
  FaSmile,
  FaComments,
  FaCalendarCheck,
} from "react-icons/fa";
import { BiTestTube } from "react-icons/bi";

/* ------------------------------ 常量 ------------------------------ */

const TABS = [
  { key: "onboarding", label: "启程问答", icon: <FaFire size={18} /> },
  { key: "policy", label: "政策资源", icon: <FaFileAlt size={18} /> },
  { key: "mood", label: "心情小站", icon: <FaSmile size={18} /> },
  { key: "explore", label: "交流广场", icon: <FaComments size={18} /> },
  { key: "lab", label: "探索实验室", icon: <BiTestTube size={18} />, route: "/lab/multimodal" },
];

const FEATURES = [
  { key: "policy", label: "政策资源", icon: <FaFileAlt size={22} />, desc: "了解城市支持", color: "bg-blue-100" },
  { key: "mood", label: "心情小站", icon: <FaSmile size={22} />, desc: "温柔地陪伴你", color: "bg-pink-100" },
  { key: "explore", label: "交流广场", icon: <FaComments size={22} />, desc: "同路人的分享", color: "bg-green-100" },
  { key: "checkin", label: "今日小记", icon: <FaCalendarCheck size={22} />, desc: "记录心情与收获", color: "bg-yellow-100" },
  { key: "lab", label: "探索实验室", icon: <BiTestTube size={22} />, desc: "用声音表达心情", color: "bg-purple-100", route: "/lab/multimodal" },
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
    <motion.div
      className="min-h-screen bg-white flex flex-col items-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 顶部栏 */}
      <div className="w-full max-w-md sticky top-0 z-20 py-4 px-4 bg-white/90 backdrop-blur-sm shadow-md rounded-b-xl flex justify-between items-center">
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

      {/* ===== 统一包裹器，插画与内容完全对齐 ===== */}
      <div className="w-full flex flex-col items-center">
        <div className="relative w-full max-w-md">
          {/* 背景插画，绝对定位，完全对齐 max-w-md */}
          <div className="absolute top-0 left-0 w-full h-[210px] md:h-[320px] overflow-hidden z-0 rounded-b-3xl">
            <Image
              src="/illustrations/home-hero.jpeg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/95" />
          </div>

          {/* 主内容区，叠加插画之上 */}
          <main
            className="relative z-10 w-full px-4"
            style={{ marginTop: "160px" }}
          >
            {/* 欢迎文案 */}
            <motion.p
              className="text-gray-500 text-base text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              欢迎来到 Restart Guide，一起探索温柔的重启之旅
            </motion.p>

            {/* 搜索栏 */}
            <div className="w-full mt-3 mb-4">
              <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 shadow-soft transition-all focus-within:ring-2 focus-within:ring-primary-300">
                <FaSearch className="mr-2 text-gray-400" />
                <input
                  readOnly
                  placeholder="想了解些什么？"
                  className="flex-1 bg-transparent outline-none text-base"
                />
              </div>
            </div>

            {/* 启程问答 */}
            <div className="w-full mb-5">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/onboarding")}
                className="rounded-xl p-6 min-h-[70px] flex items-center justify-between cursor-pointer
                           bg-primary-100 border border-primary-200 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center">
                  <FaFire size={22} className="mr-3 text-primary-500" />
                  <span className="font-bold text-lg text-primary-800">启程问答</span>
                </div>
                <span className="text-xs text-gray-500">了解你现在的状态</span>
              </motion.div>
            </div>

            {/* 功能卡片 */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="w-full grid gap-4 mb-24 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]"
            >
              {FEATURES.map((f) => (
                <motion.div
                  key={f.key}
                  variants={item}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push(f.route || `/${f.key}`)}
                  className={`rounded-xl p-6 min-h-[100px] flex flex-col justify-between cursor-pointer
                             shadow-md border border-transparent hover:shadow-lg transition-all ${f.color}`}
                >
                  <div className="flex items-center mb-2">
                    <span className="mr-2 text-xl">{f.icon}</span>
                    <span className="font-bold text-lg">{f.label}</span>
                  </div>
                  <span className="text-sm text-gray-600">{f.desc}</span>
                </motion.div>
              ))}
            </motion.div>
          </main>
        </div>
      </div>

      {/* ===== 底部导航，全屏居中，无偏移 ===== */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center z-30 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-md mx-auto rounded-t-xl shadow-lg bg-white border-t py-3 flex justify-around items-center">
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
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(isAuthed ? "/user" : "/welcome")}
            className="flex flex-col items-center px-2 text-xs text-gray-500 hover:text-primary-500 transition-all"
          >
            <FaUserCircle size={18} />
            <span className="mt-1">我的空间</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
