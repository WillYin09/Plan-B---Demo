"use client";

import React, { ReactNode, forwardRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  asChild?: boolean;
  size?: "default" | "sm" | "lg";
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, className = "", disabled = false, asChild = false, size = "default", href }, ref) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      default: "px-5 py-2.5",
      lg: "px-8 py-3 text-lg",
    };

    const baseClasses = `font-medium rounded-xl transition-all ${sizeClasses[size]} ${className}`;

    if (asChild && href) {
      return (
        <Link href={href} passHref>
          <motion.a
            className={baseClasses}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {children}
          </motion.a>
        </Link>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={baseClasses}
        onClick={onClick}
        disabled={disabled}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button }; 