// /components/EmotionTabs.tsx
import React from "react";

interface EmotionTabsProps {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}
export const EmotionTabs: React.FC<EmotionTabsProps> = ({ options, value, onChange }) => (
  <div className="flex gap-2 mb-4">
    {options.map(opt => (
      <button
        key={opt}
        className={`px-3 py-1 rounded-xl text-sm font-medium transition ${
          opt === value ? "bg-orange-500 text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
        onClick={() => onChange(opt)}
      >
        {opt}
      </button>
    ))}
  </div>
);
