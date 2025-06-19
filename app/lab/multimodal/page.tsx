"use client";
import React, { useRef, useState } from "react";
import { SectionTitle } from "../../components/SectionTitle";
import { SuggestionCard } from "../../components/SuggestionCard";
import { FaMicrophone, FaPaperPlane, FaImage } from "react-icons/fa";

// =============== 语音输入子组件 ==============
function VoiceInput({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  const handleStart = () => {
    // 兼容性判断
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      alert("当前浏览器不支持语音识别功能。");
      return;
    }
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "zh-CN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setRecording(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onChange(transcript);
    };
    recognition.onerror = () => setRecording(false);
    recognition.onend = () => setRecording(false);

    recognition.start();
  };

  const handleStop = () => {
    recognitionRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={recording ? handleStop : handleStart}
          className={`rounded-full p-3 text-xl transition shadow ${recording ? "bg-orange-500 text-white animate-pulse" : "bg-gray-100 text-gray-600 hover:bg-orange-200"}`}
        >
          <FaMicrophone />
        </button>
        <span className="text-gray-500 text-sm">{recording ? "正在识别..." : "点击开始语音输入"}</span>
      </div>
      <textarea
        className="w-full mt-3 min-h-[48px] rounded-lg border border-gray-200 p-2"
        placeholder="语音内容将显示在这里，也可手动编辑..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

// =============== 图片上传子组件 ==============
function ImageUpload({ file, setFile }: { file: File | null, setFile: (file: File | null) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  return (
    <div className="mb-3">
      <button
        type="button"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-orange-50 text-gray-700 font-medium shadow"
        onClick={() => inputRef.current?.click()}
      >
        <FaImage /> {file ? file.name : "上传图片"}
      </button>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={onFileChange}
        style={{ display: "none" }}
      />
      {file && (
        <div className="mt-2 flex flex-col items-start">
          <img
            src={URL.createObjectURL(file)}
            alt="预览"
            className="w-32 h-32 object-cover rounded-xl border"
          />
          <span className="text-xs text-gray-400 mt-1">{file.name}</span>
        </div>
      )}
    </div>
  );
}

// =============== 主页面组件 ==============
export default function MultimodalLabPage() {
  // 语音输入状态
  const [voiceText, setVoiceText] = useState("");
  const [voiceAIResult, setVoiceAIResult] = useState<string | null>(null);
  const [voiceLoading, setVoiceLoading] = useState(false);

  // 图片输入状态
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageDesc, setImageDesc] = useState("");
  const [imgAIResult, setImgAIResult] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState(false);

  // 伪 GPT API 调用（后续可替换为真实接口）
  const fetchAIResult = async (prompt: string) => {
    // 这里可替换为 fetch 真实 GPT 接口
    // return fetch("/api/gpt", { method: "POST", ...})
    await new Promise(r => setTimeout(r, 1000)); // 模拟延迟
    // 伪逻辑：简单关键词判断
    if (prompt.includes("开心") || prompt.includes("微笑")) {
      return "AI判断你很开心，建议继续保持良好情绪！";
    } else if (prompt.includes("焦虑") || prompt.includes("压力")) {
      return "检测到焦虑情绪，建议尝试深呼吸和冥想来放松自己。";
    }
    return "情绪状态识别完成，建议多关注自身感受和健康。";
  };

  // 语音分析提交
  const handleVoiceSubmit = async () => {
    if (!voiceText.trim()) return;
    setVoiceLoading(true);
    const prompt = `我刚才说的是："${voiceText}"，你能帮我判断我的情绪状态并给出简短调节建议吗？`;
    const result = await fetchAIResult(prompt);
    setVoiceAIResult(result);
    setVoiceLoading(false);
  };

  // 图片分析提交
  const handleImgSubmit = async () => {
    if (!imageFile || !imageDesc.trim()) return;
    setImgLoading(true);
    const prompt = `
我上传了一张图片，描述如下：
${imageDesc}
图片文件名：${imageFile.name}
你能根据这些内容判断这个人的情绪状态吗？请给出简洁分析，并建议一个调节方式。
    `.trim();
    const result = await fetchAIResult(prompt);
    setImgAIResult(result);
    setImgLoading(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-7 min-h-screen bg-[#f9fafb]">
      <SectionTitle title="情绪实验室" subtitle="语音或图片也能表达情绪" showBack />

      {/* ===== 语音输入模块 ===== */}
      <div className="bg-white rounded-xl shadow p-5 mb-7">
        <h2 className="font-bold text-lg mb-3">🎤 语音输入</h2>
        <VoiceInput value={voiceText} onChange={setVoiceText} />
        <button
          className="mt-2 flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white font-medium shadow hover:bg-orange-600 transition disabled:opacity-50"
          onClick={handleVoiceSubmit}
          disabled={voiceLoading || !voiceText.trim()}
        >
          <FaPaperPlane /> 提交给AI
        </button>
        {voiceLoading && <div className="mt-2 text-orange-400">AI分析中...</div>}
        {voiceAIResult && (
          <div className="mt-4">
            <SuggestionCard content={voiceAIResult} agent="AI建议" />
          </div>
        )}
      </div>

      <hr className="my-8 border-gray-200" />

      {/* ===== 图片输入模块 ===== */}
      <div className="bg-white rounded-xl shadow p-5 mb-7">
        <h2 className="font-bold text-lg mb-3">🖼️ 图片输入</h2>
        <ImageUpload file={imageFile} setFile={setImageFile} />
        <textarea
          className="w-full rounded-xl border border-gray-200 p-2 mb-3"
          placeholder="图片说明：描述你上传的内容、想表达的情绪等"
          rows={2}
          value={imageDesc}
          onChange={e => setImageDesc(e.target.value)}
        />
        <button
          className="mt-1 flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white font-medium shadow hover:bg-orange-600 transition disabled:opacity-50"
          onClick={handleImgSubmit}
          disabled={imgLoading || !imageFile || !imageDesc.trim()}
        >
          <FaPaperPlane /> 分析情绪
        </button>
        {imgLoading && <div className="mt-2 text-orange-400">AI分析中...</div>}
        {imgAIResult && (
          <div className="mt-4">
            <SuggestionCard content={imgAIResult} agent="AI建议" />
          </div>
        )}
      </div>
    </div>
  );
}
