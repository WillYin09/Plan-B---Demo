"use client";
import { useRouter } from "next/navigation";
import { SectionTitle } from "../components/SectionTitle";

// mock 情绪功能数据
const moodFeatures = [
  {
    icon: "🧠",
    title: "AI情绪陪伴",
    desc: "聊天即陪伴，释放压力",
    action: "去对话",
    link: "/mood/chat",
    bg: "bg-orange-50",
  },
  {
    icon: "🌬️",
    title: "冥想练习",
    desc: "3分钟冥想，带你安定",
    action: "去冥想",
    link: "/mood/breath",
    bg: "bg-blue-50",
  },
  {
    icon: "🧰",
    title: "情绪调节技巧",
    desc: "学会识别情绪，调节节律",
    action: "查看技巧",
    link: "/mood/tips",
    bg: "bg-green-50",
  },
  {
    icon: "👥",
    title: "匿名社群支持",
    desc: "加入群聊，倾听与分享",
    action: "加入群聊",
    link: "/mood/group",
    bg: "bg-purple-50",
  },
];

// 单卡片子组件
function MoodCard({
  icon,
  title,
  desc,
  action,
  link,
  bg,
}: typeof moodFeatures[0]) {
  const router = useRouter();
  return (
    <div
      className={`${bg} flex items-center justify-between rounded-xl shadow-md p-4 transition-transform hover:scale-105`}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl">{icon}</span>
        <div>
          <div className="font-bold text-gray-800 mb-1">{title}</div>
          <div className="text-sm text-gray-500">{desc}</div>
        </div>
      </div>
      <button
        onClick={() => router.push(link)}
        className="bg-orange-500 text-white px-4 py-2 rounded-xl font-medium shadow hover:opacity-90 transition"
      >
        {action}
      </button>
    </div>
  );
}

export default function MoodHome() {
  return (
    <div className="min-h-screen bg-[#f7f7fa] flex flex-col">
      <div className="w-full max-w-md mx-auto py-10 px-4 space-y-6">
        <SectionTitle title="情绪管理" showBack />
        {/* 顶部插画 */}
        <div className="flex justify-center mb-2">
          <img
            src="https://placehold.co/320x120?text=情绪插画"
            alt="情绪插画"
            className="rounded-xl shadow bg-white w-80 h-32 object-contain"
          />
        </div>
        {/* 功能卡片 */}
        <div className="space-y-4">
          {moodFeatures.map((item) => (
            <MoodCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
