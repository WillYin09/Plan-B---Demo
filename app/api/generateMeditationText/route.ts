import { fetch, ProxyAgent } from "undici";

const proxyUrl = "http://127.0.0.1:7897";

export async function GET() {
  const endpoint = "https://api.siliconflow.cn/v1/chat/completions";
  const apiKey = "sk-rxhguigdxljitebjzuwperotcmvsjvywminndetssnacanei";

  const body = {
    model: "Qwen/QwQ-32B",
    messages: [
      {
        role: "user",
        content: "请生成一段适合冥想的中文引导语，60-90秒，温柔平和，无宗教内容。"
      }
    ],
    stream: false,
    max_tokens: 512,
    temperature: 0.7,
    top_p: 0.8
  };

  try {
    const dispatcher = new ProxyAgent(proxyUrl);
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
      dispatcher
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("API请求失败", res.status, errText);
      return Response.json({ text: `接口调用失败：${res.status} ${errText}` });
    }

    // 类型断言让 TypeScript 智能提示消失
    const data = await res.json() as {
      choices?: { message?: { content?: string } }[]
    };
    const text = data.choices?.[0]?.message?.content ?? "生成失败，请稍后重试。";
    return Response.json({ text });
  } catch (err) {
    console.error("siliconflow error", err);
    return Response.json({ text: "接口调用失败：" + (err as Error).message });
  }
}
