import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaMicrophone, FaStop } from "react-icons/fa";

interface VoiceRecorderProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxHeight?: number;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  value,
  onChange,
  placeholder = "语音内容将显示在这里，也可手动编辑...",
  maxHeight = 120
}) => {
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
    <div className="w-full">
      <div className="flex items-center gap-3 mb-3">
        <motion.button
          type="button"
          onClick={recording ? handleStop : handleStart}
          whileTap={{ scale: 0.95 }}
          className={`rounded-full p-3 text-lg shadow-md transition-all ${
            recording 
              ? "bg-primary-500 text-white" 
              : "bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-500"
          }`}
        >
          {recording ? <FaStop /> : <FaMicrophone />}
        </motion.button>
        
        <span className="text-gray-500 text-sm">
          {recording ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center"
            >
              正在识别
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >...</motion.span>
            </motion.span>
          ) : (
            "点击开始语音输入"
          )}
        </span>
        
        {recording && (
          <div className="flex items-center gap-1 ml-auto">
            {[1, 2, 3, 4].map(i => (
              <motion.div
                key={i}
                className="w-1 bg-primary-400 rounded-full"
                animate={{ 
                  height: [4, 12, 8, 16, 4],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      <textarea
        className="w-full rounded-xl border border-gray-200 p-4 outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ maxHeight }}
        rows={3}
      />
    </div>
  );
}; 