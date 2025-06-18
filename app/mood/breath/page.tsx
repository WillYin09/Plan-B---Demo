"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MeditationAudioPlayer from "./MeditationAudioPlayer";

function BackButton({ label = "返回" }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="mb-4 text-gray-400 hover:text-gray-700 transition flex items-center"
    >
      <span className="text-xl mr-1">←</span> {label}
    </button>
  );
}

// 工具函数
const getFavorites = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem("meditationFavorites") || "[]");
  } catch {
    return [];
  }
};
const setFavorites = (arr: string[]) => {
  localStorage.setItem("meditationFavorites", JSON.stringify(arr));
};

export default function MeditationPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const checkFav = (txt: string) => {
    const favorites = getFavorites();
    setIsFav(!!txt && favorites.includes(txt));
  };

  const fetchMeditation = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generateMeditationText");
      const data = await res.json();
      setText(data.text);
      setTimeout(() => checkFav(data.text), 0);
    } catch {
      setText("获取冥想文案失败，请稍后重试。");
      setIsFav(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMeditation();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    checkFav(text);
    // eslint-disable-next-line
  }, [text]);

  const handleToggleFav = () => {
    const favorites = getFavorites();
    if (!text) return;
    let newFavorites;
    if (favorites.includes(text)) {
      newFavorites = favorites.filter((t) => t !== text);
      setIsFav(false);
    } else {
      newFavorites = [...favorites, text];
      setIsFav(true);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="w-full max-w-md mx-auto py-8 min-h-screen flex flex-col items-center justify-center">
      <BackButton />
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">今日冥想引导</h1>
      <div className="bg-white shadow rounded-xl p-6 w-full text-gray-700 text-lg leading-relaxed whitespace-pre-line">
        {loading ? "正在生成冥想文案，请稍等..." : text}
      </div>

      {/* 音频播放功能 */}
      <MeditationAudioPlayer text={text} />

      <div className="flex flex-row gap-4 mt-6">
        <button
          onClick={fetchMeditation}
          disabled={loading}
          className="bg-orange-500 text-white px-6 py-2 rounded-xl font-medium shadow hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "生成中..." : "再来一段"}
        </button>
        <button
          onClick={handleToggleFav}
          disabled={loading || !text}
          className={`px-6 py-2 rounded-xl font-medium shadow border transition
            ${isFav
              ? "bg-yellow-100 text-yellow-700 border-yellow-300"
              : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-yellow-50 hover:text-yellow-700"}
          `}
        >
          {isFav ? "⭐ 已收藏（点击取消）" : "☆ 收藏"}
        </button>
      </div>
    </div>
  );
}
