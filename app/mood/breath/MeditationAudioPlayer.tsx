"use client";
import React, { useState, useRef, useEffect } from "react";

interface Props {
  text: string;
}

export default function MeditationAudioPlayer({ text }: Props) {
  const [status, setStatus] = useState<
    "idle" | "ready" | "playing" | "paused" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [voiceReady, setVoiceReady] = useState(false);

  // 选择中文女声
  function getZhFemaleVoice(): SpeechSynthesisVoice | null {
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find(
        (v) =>
          v.lang === "zh-CN" &&
          (v.name.includes("Xiaoxiao") ||
            v.name.includes("female") ||
            v.name.includes("女"))
      ) || 
      voices.find((v) => v.lang.startsWith("zh")) || 
      null
    );
  }

  // 初始化朗读
  const play = () => {
    if (!text) return;
    setError(null);

    // 如果有正在播放的朗读，先取消
    window.speechSynthesis.cancel();

    const utter = new window.SpeechSynthesisUtterance(text);
    // 设置中文女声
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
      setStatus("ready");
      setProgress(100);
    };
    utter.onerror = (e) => {
      setStatus("error");
      setError("朗读失败，请重试或更换浏览器");
    };
    utter.onboundary = (event) => {
      // 简单估算进度（每个单词/字符）
      if (typeof event.charIndex === "number" && text.length > 0) {
        setProgress(Math.floor((event.charIndex / text.length) * 100));
      }
    };

    setStatus("playing");
    setProgress(0);
    window.speechSynthesis.speak(utter);
  };

  // 暂停/继续
  const pause = () => {
    window.speechSynthesis.pause();
    setStatus("paused");
  };
  const resume = () => {
    window.speechSynthesis.resume();
    setStatus("playing");
  };
  const stop = () => {
    window.speechSynthesis.cancel();
    setStatus("ready");
    setProgress(0);
  };

  // 文案变化时自动准备就绪
  useEffect(() => {
    setStatus("ready");
    setProgress(0);
    setError(null);
    // 某些浏览器（如Chrome）语音列表是懒加载的
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => setVoiceReady(true);
    } else {
      setVoiceReady(true);
    }
    // eslint-disable-next-line
  }, [text]);

  return (
    <div className="w-full flex flex-col items-center my-6">
      {status === "error" && (
        <div className="text-red-500 my-3">{error}</div>
      )}
      {/* 控件区 */}
      <div className="flex flex-row gap-4 items-center w-full justify-center">
        {(status === "ready" || status === "paused") ? (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
            onClick={status === "ready" ? play : resume}
            disabled={!voiceReady || !text}
          >
            {status === "paused" ? "▶️ 继续" : "▶️ 播放"}
          </button>
        ) : status === "playing" ? (
          <button
            className="px-4 py-2 bg-yellow-400 text-white rounded-xl shadow hover:bg-yellow-500 transition"
            onClick={pause}
          >
            ⏸️ 暂停
          </button>
        ) : null}
        {/* 停止/重播 */}
        <button
          className="px-3 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition"
          onClick={stop}
          disabled={status !== "playing" && status !== "paused"}
        >
          🔁 停止
        </button>
      </div>
      {/* 进度条 */}
      <div className="w-full mt-3 flex flex-col items-center">
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          readOnly
          className="w-72 accent-green-400"
          disabled
        />
        <div className="text-xs text-gray-400 mt-1">
          {status === "playing" && "播放中"}
          {status === "paused" && "已暂停"}
          {status === "ready" && "可播放"}
          {status === "error" && "生成失败"}
        </div>
      </div>
    </div>
  );
}
