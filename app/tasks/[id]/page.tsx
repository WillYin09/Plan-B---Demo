"use client";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

// 假数据：建议后续和 tasks 列表 mock 保持同步
const TASKS = [
  {
    id: "1",
    title: "申请失业金",
    description: "登录北京市社保App完成失业金申请",
    deadline: "建议在3天内提交",
    region: "北京市",
    notes: "准备好个人身份信息和社保账户截图",
    status: "incomplete",
    link: "https://example.com/policy-detail"
  },
  // ...更多 mock 数据
];

export default function TaskDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { id } = params;
  const task = TASKS.find(t => t.id === id);
  const [done, setDone] = useState(task?.status === "done");

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        未找到对应任务
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7fa] flex flex-col px-2 py-4">
      <div className="w-full max-w-md mx-auto flex flex-col flex-1 justify-between min-h-[80vh]">
        {/* 顶部返回+插画 */}
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
              alt="任务插画"
              className="rounded-xl shadow bg-white w-80 h-32 object-contain"
            />
          </div>
          {/* 主体信息 */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="text-xl font-bold mb-2">{task.title}</div>
            <div className="text-gray-500 mb-2">{task.description}</div>
            <div className="flex flex-col gap-2 mt-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">建议完成时间：</span>
                <span className="text-orange-500">{task.deadline}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">适用城市：</span>
                <span className="bg-gray-100 px-2 py-1 rounded">{task.region}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">补充说明：</span>
                <span>{task.notes}</span>
              </div>
            </div>
          </div>
        </div>
        {/* 底部按钮 */}
        <div className="space-y-3 mb-6">
          <a
            href={task.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 rounded-xl bg-orange-400 text-white font-bold shadow hover:bg-orange-500 transition text-center"
          >
            去体验
          </a>
          <button
            disabled={done}
            className={`w-full py-3 rounded-xl font-bold shadow transition
              ${done
                ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"}`}
            onClick={() => setDone(true)}
          >
            {done ? "已完成" : "标记完成"}
          </button>
        </div>
      </div>
    </div>
  );
}
