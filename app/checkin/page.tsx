"use client";
import { useState } from "react";

// mock 今日任务
const todayTasks = [
  { id: 1, title: "完成失业金申请流程", status: "done" },
  { id: 2, title: "处理医保状态", status: "pending" },
  { id: 3, title: "完善简历", status: "pending" },
];

export default function Checkin() {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 提交打卡
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      alert("🎉 打卡成功！");
      setText("");
      setSubmitting(false);
    }, 800); // 模拟网络延迟
  };

  // emoji 任务状态
  const statusEmoji = (status: string) =>
    status === "done" ? "✅" : "🔶";

  return (
    <div className="min-h-screen bg-[#f7f7fa] flex flex-col">
      <div className="w-full max-w-md mx-auto py-10 px-4 flex-1 flex flex-col space-y-6">
        {/* 顶部插画 */}
        <div className="flex justify-center">
          <img
            src="https://placehold.co/320x120?text=打卡插画"
            alt="打卡插画"
            className="rounded-xl shadow bg-white w-80 h-32 object-contain"
          />
        </div>
        {/* 今日任务 */}
        <div className="bg-white rounded-xl shadow p-4">
          <div className="font-semibold mb-3 text-gray-800">
            今日任务
          </div>
          <ul className="space-y-2">
            {todayTasks.map(task => (
              <li key={task.id} className="flex items-center gap-2 text-base">
                <span className="text-xl">{statusEmoji(task.status)}</span>
                <span className={task.status === "done" ? "line-through text-gray-400" : ""}>
                  {task.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* 打卡文案 */}
        <div>
          <div className="mb-2 font-medium text-gray-700">今天你有什么感想？（可以随便写~）</div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              className="w-full min-h-[96px] rounded-lg border border-gray-200 p-4 shadow"
              placeholder="写下你的反思、感悟或心情..."
              value={text}
              onChange={e => setText(e.target.value)}
              disabled={submitting}
              maxLength={300}
            />
            <button
              type="submit"
              disabled={submitting || !text.trim()}
              className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold shadow hover:opacity-90 transition disabled:bg-gray-300 disabled:text-gray-400"
            >
              {submitting ? "提交中..." : "提交打卡"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
