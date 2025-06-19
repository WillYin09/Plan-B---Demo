import React from "react";
import { motion } from "framer-motion";

interface ExploreCardProps {
  id: string;
  title: string;
  author: string;
  tags: string[];
  type: string;
  onClick: (id: string) => void;
}

export const ExploreCard: React.FC<ExploreCardProps> = ({
  id,
  title,
  author,
  tags,
  type,
  onClick
}) => {
  // Different styling based on post type
  const typeStyles = {
    share: {
      bg: "bg-gradient-to-br from-primary-50 to-white",
      icon: "💬",
      accent: "bg-primary-500"
    },
    question: {
      bg: "bg-gradient-to-br from-blue-50 to-white",
      icon: "❓",
      accent: "bg-blue-500"
    },
    hot: {
      bg: "bg-gradient-to-br from-secondary-50 to-white",
      icon: "🔥",
      accent: "bg-secondary-500"
    }
  };
  
  const style = typeStyles[type as keyof typeof typeStyles] || typeStyles.share;
  
  return (
    <motion.div
      className={`${style.bg} rounded-2xl shadow-card p-5 border border-gray-100 overflow-hidden relative`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      {/* Type indicator accent */}
      <div className={`absolute top-0 left-0 w-1.5 h-full ${style.accent}`}></div>
      
      {/* Content */}
      <div className="pl-2">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-2">{title}</h3>
            <div className="flex items-center text-xs text-gray-500">
              <span className="mr-1">{style.icon}</span>
              <span>by {author}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <span
              key={tag}
              className="bg-white bg-opacity-70 text-xs px-3 py-1 rounded-full text-gray-700 border border-gray-100"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            发布于 3天前
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-full bg-primary-500 text-white text-sm font-medium shadow-button hover:bg-primary-600 transition-colors"
            onClick={() => onClick(id)}
          >
            查看详情
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}; 