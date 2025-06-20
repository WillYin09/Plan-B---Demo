"use client";
import React, { useState, useEffect } from "react";
import { SectionTitle } from "../../components/SectionTitle";
import { EmotionTabs } from "../../components/EmotionTabs";
import { SuggestionCard } from "../../components/SuggestionCard";

const EMOTIONS = ["有些紧张", "有点低落", "内心烦躁", "感觉空空", "需要动力"];

interface TipData {
  agent: string;
  content: string;
}

export default function MoodTipsPage() {
  const [emotion, setEmotion] = useState(EMOTIONS[0]);
  const [tips, setTips] = useState<TipData[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [favorites, setFavorites] = useState<{ [k: string]: TipData }>({});

  // 加载收藏
  useEffect(() => {
    try {
      const fav = JSON.parse(localStorage.getItem("emotionTips") || "{}");
      setFavorites(fav);
    } catch {
      setFavorites({});
    }
  }, []);

  // 查询API
  const fetchTips = async (emo: string = emotion) => {
    setLoading(true);
    setErr("");
    setTips([]);
    try {
      const res = await fetch(`/api/generateTips?emotion=${encodeURIComponent(emo)}`);
      const data = await res.json();
      setTips(data.tips);
    } catch {
      setErr("暂时无法获取建议，请稍后再试");
    }
    setLoading(false);
  };

  // 自动首次加载
  useEffect(() => { fetchTips(emotion); }, [emotion]);

  // 收藏逻辑
  const handleCollect = (tip: TipData) => {
    const key = `${emotion}-${tip.agent}`;
    const next = { ...favorites, [key]: tip };
    setFavorites(next);
    localStorage.setItem("emotionTips", JSON.stringify(next));
  };
  const isCollected = (tip: TipData) => {
    const key = `${emotion}-${tip.agent}`;
    return !!favorites[key];
  };

  return (
    <div className="max-w-md mx-auto min-h-screen px-3 py-6">
      <SectionTitle title="心情舒缓指南" showBack />
      
      {/* 情绪切换 */}
      <EmotionTabs 
        options={EMOTIONS}
        value={emotion}
        onChange={setEmotion}
      />
      
      {/* 建议区 */}
      {loading ? (
        <div className="text-gray-400 text-center my-8 animate-pulse">正在思考一些适合你的方法...</div>
      ) : err ? (
        <div className="text-red-500 text-center my-8">{err}</div>
      ) : tips.length === 0 ? (
        <div className="text-gray-500 text-center my-8">今天没有建议也没关系，说明你很稳定</div>
      ) : (
        tips.map((tip, idx) => (
          <SuggestionCard
            key={tip.agent}
            agent={tip.agent}
            content={tip.content}
            onBookmark={() => handleCollect(tip)}
            bookmarked={isCollected(tip)}
          />
        ))
      )}
    </div>
  );
}
