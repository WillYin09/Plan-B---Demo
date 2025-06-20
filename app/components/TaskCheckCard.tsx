import React from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

interface TaskCheckCardProps {
  title: string;
  description?: string;
  completed?: boolean;
  onToggle?: () => void;
  dueDate?: string;
  category?: string;
}

export const TaskCheckCard: React.FC<TaskCheckCardProps> = ({
  title,
  description,
  completed = false,
  onToggle,
  dueDate,
  category
}) => {
  return (
    <motion.div 
      className={`p-4 rounded-xl shadow-md border border-gray-100 transition-all ${
        completed ? "bg-secondary-50" : "bg-white"
      }`}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-3">
        <motion.button
          onClick={onToggle}
          whileTap={{ scale: 0.9 }}
          className={`w-6 h-6 rounded-full flex items-center justify-center border ${
            completed 
              ? "bg-primary-500 border-primary-500 text-white" 
              : "border-gray-300 bg-white hover:border-primary-300"
          }`}
        >
          {completed && <FaCheck size={12} />}
        </motion.button>
        
        <div className="flex-1">
          <h3 className={`font-semibold transition-all ${completed ? "text-gray-500 line-through" : "text-gray-800"}`}>
            {title}
          </h3>
          
          {description && (
            <p className={`text-sm mt-1 transition-all ${completed ? "text-gray-400" : "text-gray-600"}`}>
              {description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 mt-2">
            {category && (
              <span className="px-2 py-1 text-xs rounded-full bg-secondary-100 text-secondary-700">
                {category}
              </span>
            )}
            
            {dueDate && (
              <span className={`px-2 py-1 text-xs rounded-full ${
                completed 
                  ? "bg-gray-100 text-gray-500" 
                  : "bg-primary-100 text-primary-700"
              }`}>
                {dueDate}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 