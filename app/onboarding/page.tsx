"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const OPTIONS = [
  { label: "刚被裁员", value: "laid_off" },
  { label: "主动离职", value: "resigned" },
  { label: "焦虑等待裁员", value: "anxious" },
  { label: "其他", value: "other" },
];
const ILLUSTRATION_URL = "/78f0b74b-4289-40a5-a297-ab504ab72a0a.png";

export default function OnboardingPage() {
  const [selected, setSelected] = useState<string>("");
  const [otherText, setOtherText] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!selected || (selected === "other" && !otherText.trim())) {
      return;
    }
    localStorage.setItem("hasVisited", "true");
    router.push("/tasks"); // 跳转任务清单页
  };

  return (
    <div className="min-h-screen bg-[#f7f7fa] flex flex-col items-center">
      <div className="w-full max-w-md mx-auto flex flex-col justify-between min-h-[80vh] py-6 px-2">
        <div>
          <button
            onClick={() => {
              localStorage.setItem("hasVisited", "true");
              router.push("/");
            }}
            className="mb-4 text-gray-400 hover:text-gray-700 transition"
          >
            ← 返回
          </button>
          <div className="flex justify-center mb-6">
            <img
              src={ILLUSTRATION_URL}
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
        <div className="space-y-3 mb-2">
          <button
            className="w-full py-3 rounded-xl bg-orange-400 text-white font-bold shadow hover:bg-orange-500 transition"
            onClick={handleSubmit}
            disabled={!selected || (selected === "other" && !otherText.trim())}
          >
            直接生成任务清单
          </button>
        </div>
      </div>
    </div>
  );
}
