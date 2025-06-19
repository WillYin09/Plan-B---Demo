// Design system components for Restart Guide
import React, { ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";

// Primary button with orange background
export const PrimaryButton: React.FC<{
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
} & MotionProps> = ({ children, onClick, className = "", disabled = false, ...motionProps }) => (
  <motion.button
    className={`px-5 py-2.5 rounded-xl bg-primary-500 text-white font-medium shadow-button hover:bg-primary-600 transition-colors disabled:opacity-70 ${className}`}
    onClick={onClick}
    disabled={disabled}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.97 }}
    {...motionProps}
  >
    {children}
  </motion.button>
);

// Secondary button with white background
export const SecondaryButton: React.FC<{
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
} & MotionProps> = ({ children, onClick, className = "", disabled = false, ...motionProps }) => (
  <motion.button
    className={`px-5 py-2.5 rounded-xl bg-white text-gray-700 font-medium border border-gray-200 hover:bg-secondary-50 transition-colors disabled:opacity-70 ${className}`}
    onClick={onClick}
    disabled={disabled}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.97 }}
    {...motionProps}
  >
    {children}
  </motion.button>
);

// Card container with consistent styling
export const Card: React.FC<{
  children: ReactNode;
  className?: string;
} & MotionProps> = ({ children, className = "", ...motionProps }) => (
  <motion.div
    className={`bg-white shadow-card rounded-2xl p-5 border border-gray-100 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    {...motionProps}
  >
    {children}
  </motion.div>
);

// Page section with title
export const PageSection: React.FC<{
  title: string;
  children: ReactNode;
  className?: string;
}> = ({ title, children, className = "" }) => (
  <section className={`mb-8 ${className}`}>
    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
      <div className="w-2 h-6 bg-primary-500 rounded-full mr-2"></div>
      {title}
    </h2>
    {children}
  </section>
);

// Tag component
export const Tag: React.FC<{
  children: ReactNode;
  color?: "primary" | "secondary" | "gray";
  className?: string;
}> = ({ children, color = "secondary", className = "" }) => {
  const colorMap = {
    primary: "bg-primary-50 text-primary-700",
    secondary: "bg-secondary-50 text-secondary-700",
    gray: "bg-gray-100 text-gray-700",
  };

  return (
    <span className={`inline-flex text-xs px-3 py-1 rounded-full font-medium ${colorMap[color]} ${className}`}>
      {children}
    </span>
  );
};

// Avatar component
export const Avatar: React.FC<{
  src?: string;
  alt?: string;
  emoji?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}> = ({ src, alt = "Avatar", emoji, size = "md", className = "" }) => {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  return (
    <div className={`${sizeMap[size]} rounded-full overflow-hidden flex items-center justify-center bg-gray-100 ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-xl">{emoji || "👤"}</span>
      )}
    </div>
  );
};

// Gradient background container
export const GradientContainer: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div className={`bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 ${className}`}>
    {children}
  </div>
);

// Loading spinner
export const LoadingSpinner: React.FC<{
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white";
  className?: string;
}> = ({ size = "md", color = "primary", className = "" }) => {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };
  
  const colorMap = {
    primary: "border-primary-500",
    white: "border-white",
  };

  return (
    <div className={`${sizeMap[size]} rounded-full border-2 ${colorMap[color]} border-t-transparent animate-spin ${className}`}></div>
  );
}; 