// /components/SuggestionCard.tsx
import React from "react";
import { AudioPlayer } from "./AudioPlayer";

export interface SuggestionCardProps {
  agent: string;
  content: string;
  voiceUrl?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onBookmark?: () => void;
  bookmarked?: boolean;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  agent, content, voiceUrl, onPlay, onPause, onBookmark, bookmarked
}) => (
  <div className="bg-white p-4 shadow rounded-xl mb-4">
    <div className="font-bold text-gray-800 mb-2">{agent}</div>
    <div className="text-gray-700 leading-relaxed whitespace-pre-line">{content}</div>
    <div className="flex gap-3 mt-3">
      {voiceUrl && (
        <AudioPlayer src={voiceUrl} onPlay={onPlay} onPause={onPause} />
      )}
      <button
        onClick={onBookmark}
        className={`px-3 py-1 rounded ${bookmarked ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-700"}`}
      >
        {bookmarked ? "⭐ 已收藏" : "☆ 收藏"}
      </button>
    </div>
  </div>
);
