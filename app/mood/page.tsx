"use client";
import { useRouter } from "next/navigation";
import { SectionTitle } from "../components/SectionTitle";
import Image from 'next/image';

// mock 情绪功能数据
const moodFeatures = [
  {
    icon: "🧠",
    title: "心灵对话",
    desc: "聊聊天，放松一下",
    action: "开始聊天",
    link: "/mood/chat",
    bg: "bg-primary-50",
  },
  {
    icon: "🌬️",
    title: "安静时刻",
    desc: "给自己几分钟的平静",
    action: "去呼吸",
    link: "/mood/breath",
    bg: "bg-blue-50",
  },
  {
    icon: "🧰",
    title: "情绪小贴士",
    desc: "理解自己，舒缓心情",
    action: "查看贴士",
    link: "/mood/tips",
    bg: "bg-green-50",
  },
  {
    icon: "👥",
    title: "同行社区",
    desc: "倾听与分享，不再独行",
    action: "加入社区",
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
        className="bg-primary-500 text-white px-4 py-2 rounded-xl font-medium shadow hover:opacity-90 transition"
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
        <SectionTitle 
          title="心情小站" 
          subtitle="每个心情都值得被温柔以待" 
          showBack 
        />
        {/* 顶部插画 */}
        <div className="flex justify-center mb-2">
          <Image
            src="/illustrations/mood.jpeg"
            alt="心情小站"
            width={320}
            height={200}
            priority
            className="rounded-xl shadow w-full object-cover"
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
