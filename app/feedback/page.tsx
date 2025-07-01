"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SectionTitle } from "../components/SectionTitle";

export default function FeedbackPage() {
  const router = useRouter();
  
  useEffect(() => {
    // 显示"功能开发中"提示
    alert("功能开发中～");
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f7fa] max-w-md mx-auto py-8 px-4">
      <SectionTitle title="意见反馈" showBack />
      
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="text-5xl mb-6">🚧</div>
        <h2 className="text-xl font-bold text-gray-700 mb-2">功能开发中</h2>
        <p className="text-gray-500 text-center">
          我们正在努力开发此功能，敬请期待
        </p>
      </div>
    </div>
  );
} 