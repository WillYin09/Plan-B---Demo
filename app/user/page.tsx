// app/user/page.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { SectionTitle } from "../components/SectionTitle";

const user = {
  name: "小明",
  avatar: "🧑‍💻",
};

const records = [
  {
    type: "task",
    title: "完成失业金申请流程",
    date: "2024-06-10",
  },
  {
    type: "post",
    title: "我在焦虑时写下的自救日记",
    date: "2024-06-08",
  },
  {
    type: "policy",
    title: "北京居住证办理指南",
    date: "2024-06-01",
  },
];

const settings = [
  { label: "账号信息", action: "/settings" },
  { label: "意见反馈", action: "/feedback" },
  { label: "清除缓存", action: "#" },
  { label: "隐私协议", action: "#" },
];

export default function UserCenter() {
  const router = useRouter();

  // 点击卡片后跳转（可拓展）
  const handleClick = (action: string) => {
    if (action.startsWith("/")) {
      router.push(action);
    } else {
      alert("功能开发中～");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7fa] max-w-md mx-auto py-8 px-4 space-y-6">
      {/* 返回按钮 */}
      <SectionTitle title="个人中心" showBack />
      
      {/* 顶部欢迎区 */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="text-3xl">{user.avatar}</div>
        <div>
          <div className="text-xl font-bold mb-1">欢迎回来，{user.name}</div>
          <div className="text-gray-500 text-sm">愿你每天都有好心情</div>
        </div>
      </div>

      {/* 我的记录 */}
      <div>
        <div className="text-base font-semibold mb-2">我的记录</div>
        <div className="space-y-3">
          {records.map((rec, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center cursor-pointer hover:bg-orange-50 transition"
              onClick={() => alert("查看详情功能开发中")}
            >
              <div>
                <div className="font-medium">{rec.title}</div>
                <div className="text-xs text-gray-400">{rec.date}</div>
              </div>
              <span className="text-gray-300 text-lg">›</span>
            </div>
          ))}
        </div>
      </div>

      {/* 我的设置 */}
      <div>
        <div className="text-base font-semibold mb-2">我的设置</div>
        <div className="space-y-3">
          {settings.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(s.action)}
              className="w-full bg-white rounded-xl shadow-md p-4 flex justify-between items-center hover:bg-orange-50 transition"
            >
              <span>{s.label}</span>
              <span className="text-gray-300 text-lg">›</span>
            </button>
          ))}
        </div>
      </div>

      {/* 退出登录 */}
      <button
        className="w-full mt-4 py-3 rounded-xl bg-orange-500 text-white font-bold shadow hover:bg-orange-600 transition"
        onClick={() => alert("退出登录功能开发中")}
      >
        退出登录
      </button>
    </div>
  );
}