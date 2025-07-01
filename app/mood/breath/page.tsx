"use client";
import { useState, useEffect, useRef } from "react";
import { SectionTitle } from "../../components/SectionTitle";
import { motion } from "framer-motion";
import Image from 'next/image';

// 工具函数
const getFavorites = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem("meditationFavorites") || "[]");
  } catch {
    return [];
  }
};
const setFavorites = (arr: string[]) => {
  localStorage.setItem("meditationFavorites", JSON.stringify(arr));
};

// 播放状态类型
type PlayStatus = "idle" | "ready" | "playing" | "paused" | "error";

// 配置选项
const CONFIG = {
  // 如果为true，将使用外部API而不是浏览器内置的Web Speech API
  USE_EXTERNAL_API: false,
  // 如果您计划使用Azure，请填写以下信息
  AZURE: {
    endpoint: "YOUR_AZURE_ENDPOINT",
    key: "YOUR_AZURE_API_KEY",
    region: "YOUR_AZURE_REGION",
  }
};

export default function MeditationPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [status, setStatus] = useState<PlayStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const userStopRef = useRef(false);

  const checkFav = (txt: string) => {
    const favorites = getFavorites();
    setIsFav(!!txt && favorites.includes(txt));
  };

  const fetchMeditation = async () => {
    setLoading(true);
    // 停止当前播放
    if (status === "playing" || status === "paused") {
      stopAudio();
    }
    
    try {
      const res = await fetch("/api/generateMeditationText");
      const data = await res.json();
      setText(data.text);
      setTimeout(() => checkFav(data.text), 0);
      setStatus("ready");
    } catch {
      setText("暂时无法获取引导文字，不如先自己深呼吸几次吧。");
      setIsFav(false);
    }
    setLoading(false);
  };

  // 选择中文女声
  function getZhFemaleVoice(): SpeechSynthesisVoice | null {
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find(
        (v) =>
          v.lang === "zh-CN" &&
          (v.name.includes("Xiaoxiao") || v.name.includes("female") || v.name.includes("女"))
      ) ||
      voices.find((v) => v.lang.startsWith("zh")) ||
      null
    );
  }

  // 播放音频
  const playAudio = () => {
    if (!text) return;
    setError(null);
    userStopRef.current = false;
    
    // 取消前一个朗读
    window.speechSynthesis.cancel();

    const utter = new window.SpeechSynthesisUtterance(text);
    const voice = getZhFemaleVoice();
    if (voice) utter.voice = voice;
    utter.lang = "zh-CN";
    utter.rate = 0.93;
    utter.pitch = 1;
    synthRef.current = utter;

    utter.onstart = () => {
      setStatus("playing");
    };
    utter.onend = () => {
      if (!userStopRef.current) {
        setStatus("ready");
        setProgress(100);
      }
    };
    utter.onerror = (e) => {
      console.error("Audio error:", e);
      if (!userStopRef.current) {
        setStatus("error");
        setError("无法朗读文本，请稍后重试");
      }
    };
    utter.onboundary = (event) => {
      if (typeof event.charIndex === "number" && text.length > 0) {
        setProgress(Math.floor((event.charIndex / text.length) * 100));
      }
    };

    setStatus("playing");
    setProgress(0);
    window.speechSynthesis.speak(utter);
  };

  // 暂停/继续
  const pauseAudio = () => {
    window.speechSynthesis.pause();
    setStatus("paused");
  };
  
  const resumeAudio = () => {
    window.speechSynthesis.resume();
    setStatus("playing");
  };
  
  const stopAudio = () => {
    userStopRef.current = true; // 避免onend/onerror误报
    window.speechSynthesis.cancel();
    setStatus("ready");
    setProgress(0);
  };

  useEffect(() => {
    fetchMeditation();
    
    // 检查浏览器语音支持
    if (window.speechSynthesis) {
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          // 语音加载完成
        };
      }
    }
    
    // 组件卸载时清理
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    checkFav(text);
    setStatus("ready");
    setProgress(0);
    setError(null);
    userStopRef.current = false;
    // eslint-disable-next-line
  }, [text]);

  const handleToggleFav = () => {
    const favorites = getFavorites();
    if (!text) return;
    let newFavorites;
    if (favorites.includes(text)) {
      newFavorites = favorites.filter((t) => t !== text);
      setIsFav(false);
    } else {
      newFavorites = [...favorites, text];
      setIsFav(true);
    }
    setFavorites(newFavorites);
  };

  // 检查是否是准备播放或暂停状态
  const isReadyOrPaused = status === "ready" || status === "paused";
  // 检查是否正在播放
  const isPlaying = status === "playing";
  // 检查是否发生错误
  const hasError = status === "error";

  return (
    <div className="w-full max-w-md mx-auto py-8 min-h-screen flex flex-col items-center bg-paper bg-opacity-10">
      <SectionTitle 
        title="安静时刻" 
        subtitle="你可以在这里放慢节奏，跟着呼吸，专注片刻"
        showBack 
      />
      
      {/* 冥想页顶部插图 */}
      <div className="flex justify-center mb-6">
        <Image
          src="/illustrations/meditation.jpeg"
          alt="呼吸练习"
          width={280}
          height={200}
          priority
          className="rounded-2xl shadow-md"
        />
      </div>
      
      {loading ? (
        <div className="text-gray-400 text-center my-8 animate-pulse px-8 py-12 bg-white rounded-2xl shadow-card w-full">
          正在准备一段舒适的文字，稍等片刻...
        </div>
      ) : (
        <motion.div 
          className="bg-gradient-to-br from-paper to-white rounded-2xl shadow-card p-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative">
            <span className="absolute -left-6 -top-4 text-4xl opacity-20 text-primary">❝</span>
            <motion.p 
              className="text-gray-700 text-lg leading-relaxed whitespace-pre-line min-h-[12rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {text}
            </motion.p>
            <span className="absolute -right-4 bottom-0 text-4xl opacity-20 text-primary">❞</span>
          </div>

          {/* 语音播放控制区 */}
          <div className="my-6 p-5 bg-white rounded-xl border border-paper shadow-soft">
            <p className="text-sm text-gray-700 font-medium mb-3 flex items-center">
              <span className="text-primary mr-2">🎧</span>
              倾听舒缓的引导声音：
            </p>
            
            <div className="flex items-center gap-3 mb-4">
              {isReadyOrPaused ? (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2 bg-primary text-white rounded-full shadow-button flex items-center justify-center gap-1 font-medium"
                  onClick={status === "ready" ? playAudio : resumeAudio}
                  disabled={!text || hasError}
                >
                  <span className="text-lg">▶</span>
                  <span>{status === "paused" ? "继续" : "播放"}</span>
                </motion.button>
              ) : isPlaying ? (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2 bg-primary text-white rounded-full shadow-button flex items-center justify-center gap-1 font-medium"
                  onClick={pauseAudio}
                >
                  <span className="text-lg">⏸</span>
                  <span>暂停</span>
                </motion.button>
              ) : null}
              
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2 bg-white text-gray-600 rounded-full border border-gray-200 flex items-center justify-center gap-1 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                onClick={stopAudio}
                disabled={!isPlaying && status !== "paused"}
              >
                <span className="text-lg">■</span>
                <span>停止</span>
              </motion.button>
            </div>
            
            {/* 进度条 */}
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            <div className="text-xs text-gray-500 mt-2 text-center">
              {isPlaying && "播放中..."}
              {status === "paused" && "已暂停"}
              {status === "ready" && progress === 0 && "准备就绪"}
              {status === "ready" && progress === 100 && "播放完成"}
              {hasError && <span className="text-red-500">{error}</span>}
            </div>
          </div>
          
          {/* 底部按钮区 */}
          <motion.div 
            className="flex flex-wrap gap-4 mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <motion.button 
              onClick={fetchMeditation} 
              disabled={loading}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="bg-primary text-white px-6 py-3 rounded-xl font-medium shadow-button hover:bg-opacity-90 transition-colors disabled:opacity-70 flex-1"
            >
              {loading ? "准备中..." : "换一段引导"}
            </motion.button>
            
            <motion.button
              onClick={handleToggleFav}
              disabled={loading || !text}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`px-6 py-3 rounded-xl font-medium shadow-soft border transition-all ${
                isFav 
                  ? "bg-yellow-50 text-primary border-primary" 
                  : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
              }`}
              title={isFav ? "已保存" : "把它留起来以后再看"}
            >
              <span className="flex items-center gap-1">
                <span>{isFav ? "⭐" : "☆"}</span>
                <span>{isFav ? "已保存" : "留存"}</span>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
