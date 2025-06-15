"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Task {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: "new" | "done";
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "检查医保是否断缴",
    description: "确认医保是否中断，可灵活就业续保",
    tags: ["北京", "社保"],
    status: "new",
  },
  {
    id: "2",
    title: "申请失业金",
    description: "登录社保App完成失业金申请",
    tags: ["北京", "失业金"],
    status: "new",
  },
  {
    id: "3",
    title: "记录每日情绪",
    description: "每天打卡写一条反馈，激活正向记录",
    tags: ["情绪管理"],
    status: "done",
  },
];

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const router = useRouter();

  // 加载更多任务（模拟）
  const loadMore = () => {
    alert("更多任务加载占位（可接入AI/服务端）");
  };

  // 切换任务完成状态
  const markDone = (id: string) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, status: "done" } : t)
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f7fa] flex flex-col items-center px-2 py-6">
      <div className="w-full max-w-md mx-auto">
        {/* 顶部插画+标题 */}
        <div className="flex flex-col items-center mb-6">
          <img src="https://placehold.co/320x120?text=插画" alt="插画" className="rounded-xl shadow bg-white w-80 h-32 object-contain mb-4" />
          <div className="text-xl font-bold text-gray-800">为你推荐的任务</div>
        </div>

        {/* 任务卡片列表 */}
        <div className="space-y-4 mb-6">
          {tasks.map(task => (
            <div key={task.id} className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base">{task.status === "done" ? "✅" : "📝"}</span>
                <span className={`text-lg font-semibold ${task.status === "done" ? "line-through text-gray-400" : ""}`}>{task.title}</span>
              </div>
              <div className={`text-sm ${task.status === "done" ? "text-gray-400" : "text-gray-500"}`}>{task.description}</div>
              <div className="flex gap-2 flex-wrap">
                {task.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-xs px-2 py-1 rounded">{`#${tag}`}</span>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  className={`px-4 py-2 rounded bg-orange-500 text-white text-sm font-semibold hover:opacity-90 transition ${
                    task.status === "done" ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  disabled={task.status === "done"}
                  onClick={() => router.push(`/tasks/${task.id}`)}
                >
                  去查看
                </button>
                <button
                  className={`px-4 py-2 rounded bg-gray-300 text-gray-700 text-sm font-semibold hover:opacity-90 transition ${
                    task.status === "done" ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  disabled={task.status === "done"}
                  onClick={() => markDone(task.id)}
                >
                  {task.status === "done" ? "已完成" : "标记完成"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 底部生成更多任务 */}
        <button
          className="w-full mt-2 py-3 rounded-xl bg-orange-500 text-white font-bold shadow hover:bg-orange-600 transition"
          onClick={loadMore}
        >
          生成更多任务
        </button>
      </div>
    </div>
  );
}
