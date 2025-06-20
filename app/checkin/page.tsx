"use client";
import React, { useState, useEffect } from "react";
import { SectionTitle } from "../components/SectionTitle"; // 请根据实际路径调整
import Image from 'next/image';

// 你可以把下面这部分单独抽成 components/EmotionPicker.tsx
const EMOTIONS = [
  { emoji: "😊", label: "开心" },
  { emoji: "😐", label: "心如湖面" },
  { emoji: "😔", label: "有点低落" },
  { emoji: "😰", label: "有些紧张" },
  { emoji: "😠", label: "有点烦躁" },
  { emoji: "💤", label: "感觉疲惫" },
];

function EmotionPicker({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  return (
    <div className="grid grid-cols-3 gap-3 my-4">
      {EMOTIONS.map(({ emoji, label }) => (
        <button
          key={label}
          type="button"
          className={`flex flex-col items-center p-4 rounded-xl border-2 transition
            ${value === label ? "border-primary-400 bg-primary-50 shadow" : "border-gray-200 bg-white"}
            hover:border-primary-300`}
          onClick={() => onChange(label)}
        >
          <span className="text-2xl mb-1">{emoji}</span>
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}

// 推荐任务 mock 数据（可和 /tasks 页数据结构兼容）
const MOCK_TASKS = [
  { id: "1", title: "给自己一点运动的时间" },
  { id: "2", title: "和一个关心我的人聊聊天" },
  { id: "3", title: "花10分钟学习一个小知识" },
];

export default function DailyCheckinPage() {
  // 用户ID和日期
  const userId = typeof window !== "undefined" ? localStorage.getItem("username") || "demo" : "demo";
  const today = new Date().toISOString().slice(0, 10);

  // 查询已存在的打卡
  const [checked, setChecked] = useState(false);
  const [saved, setSaved] = useState(false);

  // 表单状态
  const [mood, setMood] = useState(EMOTIONS[0].label);
  const [tasks, setTasks] = useState(MOCK_TASKS.map(t => ({ ...t, done: false })));
  const [reflection, setReflection] = useState("");
  const [meditationDone, setMeditationDone] = useState(false);

  // 检查是否已打卡（自动填充）
  useEffect(() => {
    const raw = localStorage.getItem(`checkin_${today}`);
    if (raw) {
      const data = JSON.parse(raw);
      setMood(data.mood);
      setTasks(data.tasks);
      setReflection(data.reflection);
      setMeditationDone(data.meditationDone);
      setChecked(true);
    }
  }, [today]);

  // 任务切换
  const toggleTask = (id: string) => {
    setTasks(tasks =>
      tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  // 提交打卡
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      userId,
      date: today,
      mood,
      tasks,
      reflection,
      meditationDone,
    };
    localStorage.setItem(`checkin_${today}`, JSON.stringify(data));
    setSaved(true);
    setChecked(true);
    setTimeout(() => setSaved(false), 2000); // 2秒后自动消失
  };

  return (
    <div className="max-w-md mx-auto min-h-screen px-4 py-8 bg-[#f8fafc]">
      <SectionTitle title="今日小记" showBack /> {/* 新增返回按钮 */}
      
      {/* 打卡页顶部插图 */}
      <div className="flex justify-center mb-6">
        <Image
          src="/illustrations/checkin.jpeg"
          alt="记录今天"
          width={280}
          height={200}
          priority
          className="rounded-lg"
        />
      </div>

      {checked && (
        <div className="mb-4 text-green-600 bg-green-50 rounded-lg px-4 py-2">
          今日小记已完成，你可以随时调整内容
        </div>
      )}
      {saved && (
        <div className="mb-4 text-primary-600 bg-primary-50 rounded-lg px-4 py-2 text-center">
          今天的故事已收好！
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* 情绪选择 */}
        <div>
          <div className="font-bold mb-1 text-gray-700">今天的心情</div>
          <EmotionPicker value={mood} onChange={setMood} />
        </div>

        {/* 任务完成 */}
        <div className="bg-white rounded-xl shadow p-4">
          <div className="font-bold mb-3 text-gray-700">给自己的小任务</div>
          <div className="flex flex-col gap-3">
            {tasks.map((task, i) => (
              <label key={task.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-primary-400 w-5 h-5"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <span className={task.done ? "line-through text-gray-400" : ""}>
                  {task.title}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* 文本感受 */}
        <div className="bg-white rounded-xl shadow p-4">
          <div className="font-bold mb-2 text-gray-700">今日悄悄话</div>
          <textarea
            className="w-full min-h-[72px] rounded-xl border-2 border-gray-200 p-2 text-base resize-y"
            rows={3}
            placeholder="写点什么吧，也许会更轻松一点..."
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            required
          />
        </div>

        {/* 冥想勾选 */}
        <div className="flex items-center gap-3 bg-white rounded-xl shadow p-4">
          <input
            id="meditation"
            type="checkbox"
            className="accent-primary-400 w-5 h-5"
            checked={meditationDone}
            onChange={e => setMeditationDone(e.target.checked)}
          />
          <label htmlFor="meditation" className="flex-1 text-gray-700">
            我今天给自己留了几分钟安静时间
          </label>
          <a
            href="/mood/breath"
            className="ml-3 px-3 py-1 bg-primary-50 text-primary-500 rounded-xl font-medium hover:bg-primary-100"
          >
            去呼吸
          </a>
        </div>

        {/* 提交按钮 */}
        <button
          type="submit"
          className="w-full mt-2 py-3 bg-primary-500 text-white rounded-xl font-bold text-lg shadow hover:bg-primary-600 transition"
        >
          {checked ? "保存我的调整" : "记录下今天"}
        </button>
      </form>
    </div>
  );
}
