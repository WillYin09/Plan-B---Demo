"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./hooks/useAuth";

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
  { key: "onboarding", label: "启动问答", icon: <FaFire size={18} /> },
  { key: "policy", label: "政策卡片", icon: <FaFileAlt size={18} /> },
  { key: "mood", label: "情绪支持", icon: <FaSmile size={18} /> },
  { key: "explore", label: "内容广场", icon: <FaComments size={18} /> },
  { key: "lab", label: "实验室", icon: <BiTestTube size={18} />, route: "/lab/multimodal" },
];

// 首页功能区（不含启动问答，含每日打卡）
const FEATURES = [
  { key: "policy", label: "政策卡片", icon: <FaFileAlt size={22} />, desc: "查看城市政策", color: "bg-blue-100" },
  { key: "mood", label: "情绪支持", icon: <FaSmile size={22} />, desc: "AI情绪陪伴", color: "bg-pink-100" },
  { key: "explore", label: "内容广场", icon: <FaComments size={22} />, desc: "他人经验/提问", color: "bg-green-100" },
  { key: "checkin", label: "每日打卡", icon: <FaCalendarCheck size={22} />, desc: "情绪&任务记录", color: "bg-yellow-100" },
  { key: "lab", label: "情绪实验室", icon: <BiTestTube size={22} />, desc: "探索语音/图像输入", color: "bg-purple-100", route: "/lab/multimodal" },
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center animate-fadein">
      {/* 顶部栏 */}
      <div className="w-full max-w-md flex justify-between items-center py-4 px-4 bg-white shadow-sm rounded-b-2xl sticky top-0 z-10">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push(isAuthed ? "/user" : "/welcome")}
        >
          <FaUserCircle size={32} className="text-gray-400 mr-2" />
          <span className="text-xl font-semibold">
            {isAuthed ? `你好，${username}` : "未登录，点我登录"}
          </span>
        </div>
        <FaCog
          size={24}
          className="text-gray-400 cursor-pointer hover:text-blue-400"
          title="设置"
          onClick={() => router.push("/user")}
        />
      </div>

      {/* 搜索栏 */}
      <div className="w-full max-w-md px-4 mt-5 mb-2">
        <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 shadow transition-all">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-base"
            placeholder="搜索内容（敬请期待）"
            readOnly
          />
        </div>
      </div>

      {/* 启动问答区（单独卡片/按钮） */}
      <div className="w-full max-w-md px-4 mb-4">
        <div
          className="rounded-2xl shadow-lg p-6 min-h-[70px] flex items-center justify-between cursor-pointer hover:scale-105 transition-all border border-transparent bg-orange-100 mb-2"
          onClick={() => router.push("/onboarding")}
        >
          <div className="flex items-center">
            <FaFire size={22} className="text-orange-500 mr-3" />
            <span className="font-bold text-lg text-orange-800">启动问答</span>
          </div>
          <span className="text-xs text-gray-400">选择你的当前状态</span>
        </div>
      </div>

      {/* 功能区：2x2 卡片网格 */}
      <div className="w-full max-w-md grid grid-cols-2 gap-4 px-4 mb-6">
        {FEATURES.map((feature) => (
          <div
            key={feature.key}
            className={`rounded-2xl shadow-lg p-6 min-h-[100px] flex flex-col justify-between
              cursor-pointer hover:scale-105 transition-all border border-transparent
              ${feature.color}`}
            onClick={() => router.push(feature.route || `/${feature.key}`)}
          >
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">{feature.icon}</span>
              <span className="font-bold text-lg">{feature.label}</span>
            </div>
            <span className="text-xs text-gray-400">
              {feature.desc}
            </span>
          </div>
        ))}
      </div>

      {/* 底部导航栏 */}
      <div
        className="fixed bottom-0 left-0 w-full max-w-md flex justify-around items-center py-3 bg-white border-t z-20 rounded-t-2xl shadow mx-auto"
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        {TABS.map((tab, i) => (
          <button
            key={tab.key}
            className="flex flex-col items-center text-xs px-2 transition-all text-gray-400 hover:text-blue-600"
            onClick={() => router.push(tab.route || `/${tab.key}`)}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
        <button
          className="flex flex-col items-center text-xs px-2 text-gray-400 hover:text-blue-600"
          onClick={() => router.push(isAuthed ? "/user" : "/welcome")}
        >
          <FaUserCircle size={18} />
          我的
        </button>
      </div>

      {/* 自定义动画 */}
      <style>{`
        .animate-fadein {
          animation: fadein .7s cubic-bezier(.21,1,.5,1);
        }
        @keyframes fadein {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}
