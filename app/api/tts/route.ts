import { NextRequest } from "next/server";

const TTS_URL = "https://api.siliconflow.cn/v1/audio/speech";
const API_KEY = "sk-rxhguigdxljitebjzuwperotcmvsjvywminndetssnacanei"; // 建议放到.env
const MODEL = "FunAudioLLM/CosyVoice2-0.5B";
const VOICE = "FunAudioLLM/CosyVoice2-0.5B:alex";

export async function POST(req: NextRequest) {
  let text = "";
  try {
    const data = await req.json();
    text = data.text?.trim() || "";
  } catch {
    return new Response("缺少text参数", { status: 400 });
  }
  if (!text) return new Response("缺少text参数", { status: 400 });
  return ttsHandler(text);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text") || "";
  if (!text) return new Response("缺少text参数", { status: 400 });
  return ttsHandler(text);
}

async function ttsHandler(text: string) {
  try {
    const res = await fetch(TTS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        input: text,
        voice: VOICE,
        response_format: "mp3",
        sample_rate: 32000,
        stream: false,
        speed: 1,
        gain: 0,
      }),
    });

    if (!res.ok) {
      const msg = await res.text();
      return new Response(`TTS生成失败: ${msg}`, { status: 500 });
    }

    const buffer = await res.arrayBuffer();
    return new Response(buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (e: any) {
    return new Response(`TTS请求异常: ${e.message}`, { status: 500 });
  }
}
