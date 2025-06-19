// app/mood/tips/TipCard.tsx
import React from "react";

export function TipCard({
  agent, content, onPlay, onCollect, collected, speechButton
}: {
  agent: string;
  content: string;
  onPlay?: () => void;
  onCollect?: () => void;
  collected?: boolean;
  speechButton?: React.ReactNode;
}) {
  return (
    <div className="bg-white p-4 shadow rounded-xl mb-4">
      <div className="font-bold text-gray-800 mb-2">{agent}</div>
      <div className="text-gray-700 leading-relaxed whitespace-pre-line">{content}</div>
      <div className="flex gap-3 mt-3">
        {speechButton}
        <button
          onClick={onCollect}
          className={`px-3 py-1 rounded ${collected ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-700"}`}
        >
          {collected ? "⭐ 已收藏" : "☆ 收藏"}
        </button>
      </div>
    </div>
  );
}
