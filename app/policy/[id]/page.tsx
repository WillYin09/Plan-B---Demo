"use client";
import { useRouter, useParams } from "next/navigation";
import React from "react";

// mock 数据池（实际可从接口获取/props传递）
const policyList = [
  {
    id: "1",
    title: "北京失业金申领流程",
    tags: ["北京", "失业金"],
    body: [
      "✅ 需先完成失业登记",
      "📱 登录北京市社保App申请失业金",
      "📄 提交身份证、居住证、失业证明等材料",
      "📆 建议3日内提交，审批后7日到账",
    ],
    link: "https://rsj.beijing.gov.cn/",
  },
  {
    id: "2",
    title: "北京居住证办理指南",
    tags: ["北京", "居住证"],
    body: [
      "📄 在线提交居住材料",
      "🏠 到社区盖章并预约领取",
      "⏳ 一般3-5个工作日完成审批",
    ],
    link: "https://zwfw.beijing.gov.cn/",
  },
  // 更多政策...
];

export default function PolicyDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  // 查找当前政策
  const policy = policyList.find((p) => p.id === id);

  // 复制正文
  const handleCopy = () => {
    if (!policy) return;
    navigator.clipboard.writeText(
      `${policy.title}\n${policy.body.join("\n")}\n政策原文：${policy.link}`
    );
    alert("政策内容已复制！");
  };

  if (!policy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7fa]">
        <div className="text-gray-400">未找到对应政策</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7fa]">
      <div className="max-w-md mx-auto py-4 px-3 space-y-4">
        {/* 顶部 返回+插画 */}
        <div className="flex items-center mb-2">
          <button
            className="text-gray-400 hover:text-gray-700 transition px-2 py-1 rounded"
            onClick={() => router.back()}
          >
            ← 返回
          </button>
          <div className="flex-1 flex justify-center">
            <img
              src="https://placehold.co/120x60?text=政策插画"
              alt="插画"
              className="rounded shadow bg-white h-16 object-contain"
            />
          </div>
        </div>

        {/* 主体内容卡片 */}
        <div className="bg-white p-4 rounded-xl shadow space-y-3">
          <div className="text-xl font-bold mb-1">{policy.title}</div>
          <div className="flex gap-2 mb-2">
            {policy.tags.map((tag) => (
              <span
                key={tag}
                className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="space-y-2 text-sm leading-relaxed">
            {policy.body.map((item, idx) => (
              <div key={idx}>
                {item.includes("建议") ? (
                  <span className="font-semibold text-orange-600">{item}</span>
                ) : (
                  item
                )}
              </div>
            ))}
          </div>
          {/* 官网链接 */}
          <a
            href={policy.link}
            target="_blank"
            className="block mt-2 text-blue-600 underline text-sm font-medium hover:text-orange-600"
          >
            原始政策平台/官网 &gt;
          </a>
        </div>

        {/* 底部操作按钮 */}
        <div className="flex gap-3 mt-6">
          <button
            className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-700 font-medium shadow hover:bg-gray-300 transition"
            onClick={handleCopy}
          >
            复制政策内容
          </button>
          <a
            href={policy.link}
            target="_blank"
            className="flex-1 py-3 rounded-xl bg-orange-400 text-white font-bold shadow hover:bg-orange-500 text-center transition"
          >
            跳转政策平台
          </a>
        </div>
      </div>
    </div>
  );
}
