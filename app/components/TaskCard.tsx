import React from "react";
import { motion } from "framer-motion";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: "new" | "done";
  onView: (id: string) => void;
  onToggle: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  tags,
  status,
  onView,
  onToggle
}) => {
  const isDone = status === "done";
  
  return (
    <motion.div 
      className="bg-white shadow-card rounded-2xl p-5 flex flex-col gap-3 border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center gap-3">
        <motion.div 
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isDone ? "bg-green-100" : "bg-primary-100"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(id)}
        >
          <span className="text-lg">
            {isDone ? "✅" : "📝"}
          </span>
        </motion.div>
        <h3 className={`text-lg font-semibold ${isDone ? "line-through text-gray-400" : "text-gray-800"}`}>
          {title}
        </h3>
      </div>
      
      <p className={`text-sm ${isDone ? "text-gray-400" : "text-gray-600"} leading-relaxed`}>
        {description}
      </p>
      
      <div className="flex gap-2 flex-wrap">
        {tags.map(tag => (
          <span 
            key={tag} 
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              isDone 
                ? "bg-gray-100 text-gray-500" 
                : "bg-secondary-50 text-secondary-700"
            }`}
          >
            {`#${tag}`}
          </span>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-3 mt-2">
        <motion.button
          className="px-4 py-2 rounded-full bg-primary text-white text-sm font-medium shadow hover:bg-opacity-90 transition"
          onClick={() => onView(id)}
          whileTap={{ scale: 0.97 }}
        >
          查看详情
        </motion.button>
        
        <motion.button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
            isDone
              ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
              : "bg-secondary-50 text-secondary-700 border-secondary-200 hover:bg-secondary-100"
          }`}
          onClick={() => onToggle(id)}
          whileTap={{ scale: 0.97 }}
        >
          {isDone ? "撤销完成" : "标记完成"}
        </motion.button>
      </div>
    </motion.div>
  );
}; 