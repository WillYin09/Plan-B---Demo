"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SectionTitle } from "../components/SectionTitle";

// Mock 数据
const allCities = ["北京", "上海", "广州"];
const allTabs = ["全部", "失业金", "居住证", "低保", "求职补贴", "医保延续"];

const policies = [
  {
    id: 1,
    title: "北京失业金申领流程",
    summary: "失业登记后，3日内提交材料申请失业金",
    tags: ["北京", "失业金"],
  },
  {
    id: 2,
    title: "北京居住证办理指南",
    summary: "线上提交材料+社区盖章后领取",
    tags: ["北京", "居住证"],
  },
  {
    id: 3,
    title: "上海医保延续攻略",
    summary: "异地就业人员如何延续医保？",
    tags: ["上海", "医保延续"],
  },
  {
    id: 4,
    title: "广州求职补贴政策",
    summary: "高校毕业生可申领一次性求职补贴",
    tags: ["广州", "求职补贴"],
  },
];

export default function PolicyHome() {
  const [city, setCity] = useState("北京");
  const [tab, setTab] = useState("全部");
  const [cityDropdown, setCityDropdown] = useState(false);
  const router = useRouter();

  // 筛选后的政策卡片
  const filtered = policies.filter(
    (p) =>
      (city === "全部" || p.tags.includes(city)) &&
      (tab === "全部" || p.tags.includes(tab))
  );

  return (
    <div className="min-h-screen bg-[#f7f7fa]">
      <div className="max-w-md mx-auto py-6 px-2 space-y-4">
        <SectionTitle title="政策资源" subtitle="获取地区政策支持" showBack />

        {/* 城市选择 */}
        <div className="flex justify-between items-center mb-2">
          <div className="relative">
            <button
              className="flex items-center px-4 py-2 bg-white rounded-xl shadow font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setCityDropdown((v) => !v)}
            >
              <span className="mr-2">🏙️ {city}</span>
              <span className="text-lg">{cityDropdown ? "▲" : "▼"}</span>
            </button>
            {cityDropdown && (
              <div className="absolute left-0 z-20 mt-2 bg-white rounded shadow border w-32">
                {allCities.map((c) => (
                  <div
                    key={c}
                    onClick={() => {
                      setCity(c);
                      setCityDropdown(false);
                    }}
                    className={`px-4 py-2 hover:bg-primary-50 cursor-pointer ${
                      c === city ? "font-bold text-primary" : ""
                    }`}
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>
          <span className="text-gray-400 text-sm">选择城市</span>
        </div>

        {/* 标签tab */}
        <div className="flex flex-wrap gap-2 mb-3">
          {allTabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-2xl font-medium text-sm shadow-sm transition
                ${
                  tab === t
                    ? "bg-primary text-white"
                    : "bg-white text-gray-600 hover:bg-primary-50"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* 政策卡片列表 */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center text-gray-400 py-8">暂无相关政策</div>
          ) : (
            filtered.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col space-y-2"
              >
                <div className="text-lg font-semibold mb-1">{p.title}</div>
                <div className="text-sm text-gray-500 mb-2">{p.summary}</div>
                <div className="flex gap-2 mb-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-xs text-gray-600 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="mt-1 flex justify-end">
                  <button
                    className="bg-primary text-white px-4 py-1 rounded-xl font-medium shadow hover:bg-opacity-90 text-sm"
                    onClick={() => router.push(`/policy/${p.id}`)}
                  >
                    查看详情
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
