// /components/SuggestionCard.tsx
import React from "react";
import { motion } from "framer-motion";
import { AudioPlayer } from "./AudioPlayer";

export interface SuggestionCardProps {
  agent: string;
  content: string;
  voiceUrl?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onBookmark?: () => void;
  bookmarked?: boolean;
  agentType?: 'expert' | 'friend' | 'coach' | 'default';
}

// Agent type colors mapping
const agentColorMap = {
  expert: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    avatar: '👨‍🔬',
    title: 'text-blue-800'
  },
  friend: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    avatar: '🧑',
    title: 'text-green-800'
  },
  coach: {
    bg: 'bg-primary-50',
    border: 'border-primary-200',
    avatar: '🧠',
    title: 'text-primary-800'
  },
  default: {
    bg: 'bg-secondary-50',
    border: 'border-secondary-200',
    avatar: '💡',
    title: 'text-secondary-800'
  }
};

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  agent, 
  content, 
  voiceUrl, 
  onPlay, 
  onPause, 
  onBookmark, 
  bookmarked,
  agentType = 'default'
}) => {
  const style = agentColorMap[agentType];
  
  return (
    <motion.div 
      className={`${style.bg} p-5 shadow-card rounded-2xl mb-5 border border-opacity-50 ${style.border}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -3 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-soft">
          <span className="text-lg">{style.avatar}</span>
        </div>
        <div className={`font-bold ${style.title}`}>{agent}</div>
      </div>
      
      <div className="text-gray-700 leading-relaxed whitespace-pre-line text-base">{content}</div>
      
      <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-gray-100">
        {voiceUrl && (
          <AudioPlayer src={voiceUrl} onPlay={onPlay} onPause={onPause} />
        )}
        <motion.button
          onClick={onBookmark}
          whileTap={{ scale: 0.97 }}
          className={`px-4 py-2 rounded-full flex items-center gap-1 transition-all ${
            bookmarked 
              ? "bg-yellow-100 text-yellow-700 border border-yellow-300" 
              : "bg-white text-gray-600 border border-gray-200 hover:bg-yellow-50 hover:text-yellow-700"
          }`}
        >
          <span>{bookmarked ? "⭐" : "☆"}</span>
          <span>{bookmarked ? "已收藏" : "收藏"}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
