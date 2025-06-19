// /components/SectionTitle.tsx
import React from "react";
import { useRouter } from "next/navigation";

interface SectionTitleProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}
export const SectionTitle: React.FC<SectionTitleProps> = ({
  title, showBack = false, onBack
}) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2 mb-4">
      {showBack && (
        <button
          className="text-gray-400 hover:text-gray-700 text-xl"
          onClick={() => (onBack ? onBack() : router.back())}
        >←</button>
      )}
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
    </div>
  );
};
