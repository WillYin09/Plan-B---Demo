"use client";
import { useState, useEffect } from "react";
import { SectionTitle } from "../../components/SectionTitle";
import { MeditationBlock } from "../../components/MeditationBlock";
import { AudioPlayer } from "../../components/AudioPlayer";
import Image from 'next/image';

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
  const [audioUrl, setAudioUrl] = useState(""); // For demonstration, this would be set from API

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
      
      // In a real app, this would be a valid audio URL from your API
      setAudioUrl("/test.mp3"); // Using sample audio file
    } catch {
      setText("暂时无法获取引导文字，不如先自己深呼吸几次吧。");
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

  const handlePlayAudio = () => {
    console.log("Playing meditation audio");
  };

  return (
    <div className="w-full max-w-md mx-auto py-8 min-h-screen flex flex-col items-center">
      <SectionTitle 
        title="安静时刻" 
        subtitle="你可以在这里放慢节奏，跟着呼吸，专注片刻"
        showBack 
      />
      
      {/* 冥想页顶部插图 */}
      <div className="flex justify-center mb-6">
        <Image
          src="/illustrations/meditation.jpeg"
          alt="呼吸练习"
          width={280}
          height={200}
          priority
          className="rounded-lg"
        />
      </div>
      
      {loading ? (
        <div className="text-gray-400 text-center my-8 animate-pulse">
          正在准备一段舒适的文字，稍等片刻...
        </div>
      ) : (
        <MeditationBlock 
          text={text}
          onRegenerate={fetchMeditation}
          onBookmark={handleToggleFav}
          onPlayAudio={handlePlayAudio}
          audioUrl={audioUrl}
          bookmarked={isFav}
        />
      )}
    </div>
  );
}
