// /components/EmotionTabs.tsx
import React from "react";
import { motion } from "framer-motion";

interface EmotionTabsProps {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}

export const EmotionTabs: React.FC<EmotionTabsProps> = ({ 
  options, 
  value, 
  onChange,
  className = ""
}) => (
  <div className={`flex flex-wrap gap-2 mb-6 ${className}`}>
    {options.map(opt => (
      <motion.button
        key={opt}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all relative overflow-hidden ${
          opt === value 
            ? "bg-primary text-white shadow" 
            : "bg-secondary-50 text-secondary-700 hover:bg-secondary-100"
        }`}
        onClick={() => onChange(opt)}
        whileTap={{ scale: 0.97 }}
        whileHover={{ y: -2 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {opt === value && (
          <motion.span
            className="absolute inset-0 bg-primary opacity-30"
            initial={{ scale: 0, borderRadius: "100%" }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
        {opt}
      </motion.button>
    ))}
  </div>
);
