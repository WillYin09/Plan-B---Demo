"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  const handleStartJourney = () => {
    router.push("/onboarding");
  };

  return (
    <div className="relative w-full h-60 animate-fadein">
      {/* 背景插图 */}
      {!imageError && (
        <Image
          src="/illustrations/home-hero.jpeg"
          alt="hero"
          fill
          className="object-cover rounded-none"
          priority
          onError={() => setImageError(true)}
        />
      )}
      
      {/* 文字 & 按钮容器 */}
      <div className="relative z-10 flex flex-col items-center justify-end h-60 pb-6 text-white bg-gradient-to-b from-black/10 via-black/30 to-black/40">
        {/* 品牌行 */}
        <h1 className="font-semibold tracking-wide">
          Restart Guide · 重启指南
        </h1>

        {/* 主标语 */}
        <h2 className="text-2xl font-bold text-center mt-2">
          生活暂停，不代表你被定义。
        </h2>

        {/* 副标题段落 */}
        <div className="text-center space-y-1 mt-2">
          <p className="text-sm opacity-90">
            在这里，每一次暂停都是重新开始的契机
          </p>
          <p className="text-sm opacity-90">
            让我们一起温柔地面对生活的起伏
          </p>
        </div>

        {/* 主按钮 */}
        <button
          onClick={handleStartJourney}
          className="mt-4 bg-[#FF7E33] w-56 h-11 rounded-2xl shadow-md hover:opacity-90 active:scale-95 transition"
        >
          开始我的旅程
        </button>
      </div>
    </div>
  );
} 