import React from "react";
import { motion } from "framer-motion";

interface MoodTagProps {
  emoji: string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

export const MoodTag: React.FC<MoodTagProps> = ({ 
  emoji, 
  label, 
  selected = false, 
  onClick,
  size = "md"
}) => {
  // Size variants
  const sizeClasses = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-3 text-sm",
    lg: "px-5 py-4 text-base"
  };

  const emojiSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };
  
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      whileHover={selected ? {} : { y: -2 }}
      className={`${sizeClasses[size]} rounded-xl flex flex-col items-center gap-1 transition-all border ${
        selected 
          ? "bg-primary-100 border-primary-300 shadow-inner" 
          : "bg-white border-gray-200 shadow-sm hover:bg-gray-50"
      }`}
    >
      <span className={`${emojiSizes[size]} transition-transform ${selected ? "scale-110" : ""}`}>
        {emoji}
      </span>
      <span className={`font-medium ${selected ? "text-primary-700" : "text-gray-700"}`}>
        {label}
      </span>
      
      {selected && (
        <motion.div 
          layoutId="selected-indicator"
          className="h-1 w-8 bg-primary-500 rounded-full mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
}; 