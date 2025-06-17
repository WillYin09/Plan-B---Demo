import type { NextApiRequest, NextApiResponse } from 'next'
import { fetch, ProxyAgent } from 'undici'

const proxyUrl = 'http://127.0.0.1:7897'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const userMessages = req.body.messages

  try {
    const dispatcher = new ProxyAgent(proxyUrl)
    const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk-rxhguigdxljitebjzuwperotcmvsjvywminndetssnacanei',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-R1-0528-Qwen3-8B',
        messages: userMessages,
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        frequency_penalty: 0.5,
      }),
      dispatcher, // 关键：用 undici ProxyAgent 做代理
    })

    const data = await response.json()
    res.status(200).json(data)
  } catch (err: any) {
    res.status(500).json({ error: 'AI调用失败', detail: err.message })
  }
}
