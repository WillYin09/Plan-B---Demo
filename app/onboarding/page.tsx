"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const OPTIONS = [
  { label: "刚被裁员", value: "laid_off" },
  { label: "主动离职", value: "resigned" },
  { label: "焦虑等待裁员", value: "anxious" },
  { label: "其他", value: "other" },
];

export default function Onboarding() {
  const [selected, setSelected] = useState<string>("");
  const [otherText, setOtherText] = useState("");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f7f7fa] flex flex-col items-center">
      <div className="w-full max-w-md mx-auto flex flex-col justify-between min-h-[80vh] py-6 px-2">
        {/* 顶部返回+图片 */}
        <div>
          <button
            onClick={() => router.back()}
            className="mb-4 text-gray-400 hover:text-gray-700 transition"
          >
            ← 返回
          </button>
          <div className="flex justify-center mb-6">
            <img
              src="https://placehold.co/320x120?text=插画"
              alt="插画"
              className="rounded-xl shadow bg-white w-80 h-32 object-contain"
            />
          </div>
          <div className="text-lg font-semibold text-gray-800 mb-4 text-center">
            你现在的职业状态是？
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelected(opt.value)}
                className={`rounded-xl px-4 py-3 text-base font-medium shadow transition
                  ${
                    selected === opt.value
                      ? "bg-orange-100 border-2 border-orange-400 text-orange-700"
                      : "bg-white hover:bg-gray-50 text-gray-700"
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {selected === "other" && (
            <input
              className="w-full rounded-lg border border-gray-200 p-3 shadow mb-4"
              placeholder="请补充说明..."
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
            />
          )}
        </div>
        {/* 底部按钮 */}
        <div className="space-y-3 mb-2">
          <button
            className="w-full py-3 rounded-xl bg-gray-200 text-gray-700 font-medium shadow hover:bg-gray-300 transition"
            onClick={() => alert("继续填写占位（可跳下一题）")}
          >
            ➖ 继续填写
          </button>
          <button
            className="w-full py-3 rounded-xl bg-orange-400 text-white font-bold shadow hover:bg-orange-500 transition"
            onClick={() => router.push("/tasks")}
            disabled={!selected || (selected === "other" && !otherText.trim())}
          >
            直接生成任务清单
          </button>
        </div>
      </div>
    </div>
  );
}
