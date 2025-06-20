"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const OPTIONS = [
  { label: "🌀 刚刚放下工作的包袱", value: "laid_off" },
  { label: "✈️ 自己选择了暂停脚步", value: "resigned" },
  { label: "🌫️ 工作还在，但心已经不在", value: "anxious" },
  { label: "☁️ 我也说不上来，但想慢一点", value: "other" },
];
const ILLUSTRATION_URL = "/illustrations/onboarding.jpeg";

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
              className="rounded-xl shadow bg-white w-full max-w-xs object-cover"
            />
          </div>
          <div className="text-lg font-semibold text-gray-800 mb-3 text-center">
            你现在处在人生的哪个阶段呢？
          </div>
          <div className="text-sm text-gray-500 mb-5 text-center">
            我们会根据你的节奏，陪你慢慢整理生活的方向。
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelected(opt.value)}
                className={`rounded-xl px-4 py-3 text-base font-medium shadow transition
                  ${
                    selected === opt.value
                      ? "bg-primary-100 border-2 border-primary-400 text-primary-700"
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
              placeholder="想聊聊是什么让你想慢下来吗？"
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
            />
          )}
          
          <div className="text-sm text-gray-500 mb-4 text-center">
            无论你是哪种状态，我们都在。
            <br />
            这不是一个求职工具，而是为你准备的一段陪伴旅程。
          </div>
        </div>
        <div className="space-y-3 mb-2">
          <button
            className="w-full py-3 rounded-xl bg-primary-400 text-white font-bold shadow hover:bg-primary-500 transition"
            onClick={handleSubmit}
            disabled={!selected || (selected === "other" && !otherText.trim())}
          >
            开启我的小任务清单
          </button>
        </div>
      </div>
    </div>
  );
}
