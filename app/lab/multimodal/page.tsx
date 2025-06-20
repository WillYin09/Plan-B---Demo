"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "../../components/SectionTitle";
import { SuggestionCard } from "../../components/SuggestionCard";
import { VoiceRecorder } from "../../components/VoiceRecorder";
import { FaPaperPlane, FaImage } from "react-icons/fa";

// =============== 图片上传子组件 ==============
function ImageUpload({ file, setFile }: { file: File | null, setFile: (file: File | null) => void }) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  return (
    <div className="mb-4">
      <motion.button
        type="button"
        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-100 hover:bg-primary-50 text-gray-700 font-medium shadow-md transition-all"
        onClick={() => inputRef.current?.click()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaImage className="text-primary-500" /> {file ? file.name : "添加一张照片"}
      </motion.button>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={onFileChange}
        style={{ display: "none" }}
      />
      {file && (
        <motion.div 
          className="mt-3 flex flex-col items-start"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={URL.createObjectURL(file)}
            alt="预览"
            className="w-32 h-32 object-cover rounded-xl border shadow-md"
          />
          <span className="text-xs text-gray-400 mt-1">{file.name}</span>
        </motion.div>
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
      return "看起来你的心情不错，这很棒！保持这份愉悦感，也许可以试着记录下今天让你开心的小事。";
    } else if (prompt.includes("紧张") || prompt.includes("压力")) {
      return "感受到你内心的一些波动，这很正常。试试深呼吸几次，让自己慢下来，给自己一个轻松的小空间。";
    }
    return "谢谢你的分享，表达出来就是很好的第一步。记得对自己温柔一些，每一天都是新的开始。";
  };

  // 语音分析提交
  const handleVoiceSubmit = async () => {
    if (!voiceText.trim()) return;
    setVoiceLoading(true);
    const prompt = `我刚才说的是："${voiceText}"，能帮我感受一下我现在的状态，并给些温和的建议吗？`;
    const result = await fetchAIResult(prompt);
    setVoiceAIResult(result);
    setVoiceLoading(false);
  };

  // 图片分析提交
  const handleImgSubmit = async () => {
    if (!imageFile || !imageDesc.trim()) return;
    setImgLoading(true);
    const prompt = `
我分享了一张图片，我的描述是：
${imageDesc}
图片名称：${imageFile.name}
能给我一些关于这个画面的感受和温和的建议吗？
    `.trim();
    const result = await fetchAIResult(prompt);
    setImgAIResult(result);
    setImgLoading(false);
  };

  return (
    <motion.div 
      className="max-w-md mx-auto px-4 py-6 min-h-screen bg-gray-50"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SectionTitle title="表达实验室" subtitle="声音和图片也能传递心情" showBack />

      {/* ===== 语音输入模块 ===== */}
      <motion.div 
        className="bg-white rounded-xl shadow-md p-5 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="font-bold text-lg mb-3 text-primary-800">🎤 用声音分享</h2>
        <VoiceRecorder value={voiceText} onChange={setVoiceText} />
        
        <motion.button
          className="mt-3 flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 text-white font-medium shadow-button hover:bg-primary-600 transition-all disabled:opacity-50"
          onClick={handleVoiceSubmit}
          disabled={voiceLoading || !voiceText.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaPaperPlane /> 获取温和反馈
        </motion.button>
        
        {voiceLoading && (
          <motion.div 
            className="mt-3 text-primary-500 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-4 h-4 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div>
            正在用心聆听...
          </motion.div>
        )}
        
        {voiceAIResult && (
          <div className="mt-4">
            <SuggestionCard content={voiceAIResult} agent="温和反馈" agentType="ai" />
          </div>
        )}
      </motion.div>

      <motion.hr 
        className="my-6 border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      {/* ===== 图片输入模块 ===== */}
      <motion.div 
        className="bg-white rounded-xl shadow-md p-5 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h2 className="font-bold text-lg mb-3 text-primary-800">🖼️ 用图片表达</h2>
        <ImageUpload file={imageFile} setFile={setImageFile} />
        
        <textarea
          className="w-full rounded-xl border border-gray-200 p-4 mb-3 outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
          placeholder="这张图片让我想到..."
          rows={2}
          value={imageDesc}
          onChange={e => setImageDesc(e.target.value)}
        />
        
        <motion.button
          className="mt-1 flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 text-white font-medium shadow-button hover:bg-primary-600 transition-all disabled:opacity-50"
          onClick={handleImgSubmit}
          disabled={imgLoading || !imageFile || !imageDesc.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaPaperPlane /> 获取温和反馈
        </motion.button>
        
        {imgLoading && (
          <motion.div 
            className="mt-3 text-primary-500 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-4 h-4 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div>
            正在感受画面...
          </motion.div>
        )}
        
        {imgAIResult && (
          <div className="mt-4">
            <SuggestionCard content={imgAIResult} agent="温和反馈" agentType="ai" />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
