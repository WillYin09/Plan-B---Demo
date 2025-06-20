// /components/MeditationBlock.tsx
import React from "react";
import { motion } from "framer-motion";
import { AudioPlayer } from "./AudioPlayer";

interface MeditationBlockProps {
  text: string;
  onRegenerate: () => void;
  onBookmark: () => void;
  onPlayAudio: () => void;
  audioUrl?: string;
  bookmarked?: boolean;
  loading?: boolean;
}

export const MeditationBlock: React.FC<MeditationBlockProps> = ({
  text, 
  onRegenerate, 
  onBookmark, 
  onPlayAudio, 
  audioUrl, 
  bookmarked,
  loading = false
}) => (
  <motion.div 
    className="bg-gradient-to-br from-secondary-50 to-white rounded-2xl shadow-card p-8 w-full"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="relative">
      <span className="absolute -left-6 -top-4 text-4xl opacity-20">❝</span>
      <motion.p 
        className="text-gray-700 text-lg leading-relaxed whitespace-pre-line min-h-[12rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {text}
      </motion.p>
      <span className="absolute -right-4 bottom-0 text-4xl opacity-20">❞</span>
    </div>

    {audioUrl && (
      <div className="my-6 p-4 bg-secondary-50 rounded-xl border border-secondary-100">
        <p className="text-sm text-secondary-700 mb-3">倾听舒缓的引导声音：</p>
        <AudioPlayer src={audioUrl} onPlay={onPlayAudio} />
      </div>
    )}
    
    <motion.div 
      className="flex flex-wrap gap-4 mt-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
    >
      <motion.button 
        onClick={onRegenerate} 
        disabled={loading}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="bg-primary-500 text-white px-6 py-3 rounded-xl font-medium shadow-button hover:bg-primary-600 transition-colors disabled:opacity-70"
      >
        {loading ? "准备中..." : "换一段引导"}
      </motion.button>
      
      <motion.button
        onClick={onBookmark}
        disabled={loading}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={`px-6 py-3 rounded-xl font-medium shadow border transition-all ${
          bookmarked 
            ? "bg-yellow-100 text-yellow-700 border-yellow-300" 
            : "bg-white text-gray-600 border-gray-200 hover:bg-yellow-50 hover:text-yellow-700"
        }`}
        title={bookmarked ? "已保存" : "把它留起来以后再看"}
      >
        <span className="flex items-center gap-1">
          <span>{bookmarked ? "⭐" : "☆"}</span>
          <span>{bookmarked ? "已保存" : "留存"}</span>
        </span>
      </motion.button>
    </motion.div>
  </motion.div>
);
