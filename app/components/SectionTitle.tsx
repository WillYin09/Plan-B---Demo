// /components/SectionTitle.tsx
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  subtitle?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title, showBack = false, onBack, subtitle
}) => {
  const router = useRouter();
  
  return (
    <motion.div 
      className="flex flex-col mb-6 relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <motion.button
            className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary-50 text-secondary-600 hover:bg-secondary-100 transition-colors"
            whileTap={{ scale: 0.95 }}
            onClick={() => (onBack ? onBack() : router.back())}
            aria-label="Go back"
          >
            <span className="text-xl">←</span>
          </motion.button>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="h-1 w-16 bg-primary-500 rounded-full mt-3"></div>
    </motion.div>
  );
};
