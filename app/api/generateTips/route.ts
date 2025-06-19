// /app/api/generateTips/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const emotion = searchParams.get("emotion") || "焦虑";
  const prompt = [
    {
      role: "system",
      content: `你是一个AI情绪调节助手，由两个子角色协同组成：
1）心理引导者：帮助用户理解当前情绪背后的心理机制；
2）行动建议者：为用户提供简单可行的调节策略。
请根据用户输入的情绪，分别以这两个角色输出建议，格式如下：
[
  { "agent": "心理引导者", "content": "..." },
  { "agent": "行动建议者", "content": "..." }
]`
    },
    {
      role: "user",
      content: `我当前的情绪是：${emotion}`
    }
  ];

  const res = await fetch("https://api.siliconflow.cn/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.SILICONFLOW_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "deepseek-ai/DeepSeek-R1-0528-Qwen3-8B",
      messages: prompt,
      temperature: 0.7
    })
  });

  const result = await res.json();
  const text = result.choices?.[0]?.message?.content ?? "生成失败";
  let tips = [];
  try {
    tips = JSON.parse(text);
  } catch {
    tips = [
      { agent: "心理引导者", content: "生成失败，请重试。" },
      { agent: "行动建议者", content: "生成失败，请重试。" }
    ];
  }
  return Response.json({ tips });
}
