"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SectionTitle } from "../components/SectionTitle";
import { TaskCard } from "../components/TaskCard";

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
  const [activeFilter, setActiveFilter] = useState<"all" | "new" | "done">("all");
  const router = useRouter();

  // 加载更多任务（模拟）
  const loadMore = () => {
    alert("更多任务加载占位（可接入AI/服务端）");
  };

  // 支持"完成/未完成"状态切换
  const toggleDone = (id: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, status: t.status === "done" ? "new" : "done" }
          : t
      )
    );
  };
  
  // 筛选任务
  const filteredTasks = tasks.filter(task => {
    if (activeFilter === "all") return true;
    return task.status === activeFilter;
  });

  return (
    <div className="min-h-screen bg-[#f7f7fa] flex flex-col items-center px-3 py-6">
      <div className="w-full max-w-md mx-auto">
        <SectionTitle 
          title="任务中心" 
          subtitle="完成这些任务，帮助你度过空档期" 
          showBack 
        />

        {/* 顶部插画 */}
        <motion.div 
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full h-40 mb-5 overflow-hidden rounded-2xl shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary-500 opacity-80"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <h2 className="text-2xl font-bold mb-2">重启指南</h2>
              <p className="text-center text-sm opacity-90">为你提供职业空档期的全方位支持</p>
            </div>
          </div>
        </motion.div>

        {/* 任务筛选器 */}
        <div className="flex gap-2 mb-6">
          {[
            { id: "all", label: "全部" },
            { id: "new", label: "待办" },
            { id: "done", label: "已完成" }
          ].map(filter => (
            <button
              key={filter.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeFilter === filter.id
                  ? "bg-primary text-white shadow-button"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-secondary-50"
              }`}
              onClick={() => setActiveFilter(filter.id as "all" | "new" | "done")}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* 任务卡片列表 */}
        <motion.div 
          className="space-y-4 mb-8"
          layout
        >
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              没有符合条件的任务
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                tags={task.tags}
                status={task.status}
                onView={(id) => router.push(`/tasks/${id}`)}
                onToggle={toggleDone}
              />
            ))
          )}
        </motion.div>

        {/* 底部生成更多任务 */}
        <motion.button
          className="w-full py-4 rounded-xl bg-primary text-white font-bold shadow hover:bg-opacity-90 transition"
          onClick={loadMore}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          生成更多任务
        </motion.button>
      </div>
    </div>
  );
}
