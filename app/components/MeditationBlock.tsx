// /components/MeditationBlock.tsx
import React from "react";
import { AudioPlayer } from "./AudioPlayer";

interface MeditationBlockProps {
  text: string;
  onRegenerate: () => void;
  onBookmark: () => void;
  onPlayAudio: () => void;
  audioUrl?: string;
  bookmarked?: boolean;
}

export const MeditationBlock: React.FC<MeditationBlockProps> = ({
  text, onRegenerate, onBookmark, onPlayAudio, audioUrl, bookmarked
}) => (
  <div className="bg-white rounded-xl shadow p-6 w-full text-gray-700 text-lg leading-relaxed whitespace-pre-line">
    {text}
    <div className="flex flex-row gap-4 mt-6">
      <button onClick={onRegenerate} className="bg-orange-500 text-white px-6 py-2 rounded-xl font-medium shadow hover:opacity-90">
        再来一段
      </button>
      <button
        onClick={onBookmark}
        className={`px-6 py-2 rounded-xl font-medium shadow border transition ${
          bookmarked ? "bg-yellow-100 text-yellow-700 border-yellow-300" : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-yellow-50 hover:text-yellow-700"
        }`}
      >
        {bookmarked ? "⭐ 已收藏（点击取消）" : "☆ 收藏"}
      </button>
      {audioUrl && <AudioPlayer src={audioUrl} onPlay={onPlayAudio} />}
    </div>
  </div>
);
