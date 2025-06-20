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
  agentType?: 'expert' | 'friend' | 'coach' | 'ai' | 'default';
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
  ai: {
    bg: 'bg-secondary-50',
    border: 'border-secondary-200',
    avatar: '🤖',
    title: 'text-secondary-800'
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
      className={`${style.bg} p-5 shadow-md rounded-xl mb-5 border border-opacity-50 ${style.border}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-soft">
          <span className="text-lg">{style.avatar}</span>
        </div>
        <div className={`font-bold ${style.title}`}>{agent}</div>
        
        {onBookmark && (
          <motion.button
            onClick={onBookmark}
            whileTap={{ scale: 0.97 }}
            className="ml-auto"
            aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
          >
            <span className={`text-xl ${bookmarked ? "text-yellow-500" : "text-gray-300 hover:text-yellow-400"}`}>
              {bookmarked ? "⭐" : "☆"}
            </span>
          </motion.button>
        )}
      </div>
      
      <div className="text-gray-700 leading-relaxed whitespace-pre-line text-base">{content}</div>
      
      {voiceUrl && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <AudioPlayer src={voiceUrl} onPlay={onPlay} onPause={onPause} />
        </div>
      )}
    </motion.div>
  );
};
