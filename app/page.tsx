// app/page.tsx
"use client";
import { FaUserCircle, FaCog, FaSearch, FaFire, FaFileAlt, FaSmile, FaComments } from "react-icons/fa";
import { useRouter } from "next/navigation";

const TABS = [
  { key: "onboarding", label: "启动问答", icon: <FaFire size={18} /> },
  { key: "policy", label: "政策卡片", icon: <FaFileAlt size={18} /> },
  { key: "mood", label: "情绪支持", icon: <FaSmile size={18} /> },
  { key: "explore", label: "内容广场", icon: <FaComments size={18} /> },
];
const username = "小明";

export default function Home() {
  const router = useRouter();
  const cardColors = ["bg-yellow-100", "bg-blue-100", "bg-pink-100", "bg-green-100"];
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center animate-fadein">
      {/* 顶部栏 */}
      <div className="w-full max-w-md flex justify-between items-center py-4 px-4 bg-white shadow-sm rounded-b-2xl sticky top-0 z-10">
        <div className="flex items-center">
          <FaUserCircle size={32} className="text-gray-400 mr-2" />
          <span className="text-xl font-semibold">你好，{username}</span>
        </div>
        <FaCog size={24} className="text-gray-400 cursor-pointer hover:text-blue-400" title="设置" onClick={() => router.push("/user")} />
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
      {/* Tab导航栏 */}
      <div className="w-full max-w-md flex justify-between px-4 mb-4">
        {TABS.map((tab, i) => (
          <button
            key={tab.key}
            onClick={() => router.push(`/${tab.key}`)}
            className="flex-1 mx-1 py-2 rounded-xl text-base font-semibold flex items-center justify-center bg-white text-gray-500 hover:bg-blue-100 hover:text-blue-700 transition-all"
          >
            <span className="mr-1">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      {/* 卡片区 */}
      <div className="w-full max-w-md grid grid-cols-2 gap-4 px-4 mb-6">
        {TABS.map((tab, i) => (
          <div
            key={tab.key}
            className={`rounded-2xl shadow-lg p-6 min-h-[100px] flex flex-col justify-between
            cursor-pointer hover:scale-105 transition-all border border-transparent
            ${cardColors[i % cardColors.length]}`}
            onClick={() => router.push(`/${tab.key}`)}
          >
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">{tab.icon}</span>
              <span className="font-bold text-lg">{tab.label}</span>
            </div>
            <span className="text-xs text-gray-400">
              {tab.key === "onboarding" && "选择你的当前状态"}
              {tab.key === "policy" && "查看城市政策"}
              {tab.key === "mood" && "AI情绪陪伴"}
              {tab.key === "explore" && "他人经验/提问"}
            </span>
          </div>
        ))}
      </div>
      {/* 底部导航栏 */}
      <div className="fixed bottom-0 left-0 w-full max-w-md flex justify-around items-center py-3 bg-white border-t z-20 rounded-t-2xl shadow mx-auto" style={{ left: "50%", transform: "translateX(-50%)" }}>
        {TABS.map((tab, i) => (
          <button
            key={tab.key}
            className="flex flex-col items-center text-xs px-2 transition-all text-gray-400 hover:text-blue-600"
            onClick={() => router.push(`/${tab.key}`)}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
        <button className="flex flex-col items-center text-xs px-2 text-gray-400 hover:text-blue-600" onClick={() => router.push("/user")}>
          <FaUserCircle size={18} />
          我的
        </button>
      </div>
      <style>{`
        .animate-fadein { animation: fadein .7s cubic-bezier(.21,1,.5,1); }
        @keyframes fadein {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}
