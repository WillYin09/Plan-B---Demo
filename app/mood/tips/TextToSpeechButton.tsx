"use client";
import React, { useRef, useState, useEffect } from "react";

export function TextToSpeechButton({ text }: { text: string }) {
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [status, setStatus] = useState<"ready" | "playing" | "paused" | "error">("ready");
  const [error, setError] = useState("");
  const [voiceReady, setVoiceReady] = useState(false);

  // 选取合适中文女声
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

  // 保证语音列表已加载
  useEffect(() => {
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => setVoiceReady(true);
    } else {
      setVoiceReady(true);
    }
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // 播放
  const play = () => {
    if (!text) return;
    setError("");
    window.speechSynthesis.cancel();

    const utter = new window.SpeechSynthesisUtterance(text);
    const voice = getZhFemaleVoice();
    if (voice) utter.voice = voice;
    utter.lang = "zh-CN";
    utter.rate = 0.95;
    utter.pitch = 1;

    utter.onstart = () => setStatus("playing");
    utter.onend = () => setStatus("ready");
    utter.onerror = () => {
      setStatus("error");
      setError("朗读失败，请重试或更换浏览器");
    };

    synthRef.current = utter;
    setStatus("playing");
    window.speechSynthesis.speak(utter);
  };

  // 暂停/继续/停止
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
  };

  return (
    <span className="inline-flex items-center gap-1">
      {status === "error" && (
        <span className="text-red-500 text-xs mr-1">{error}</span>
      )}
      {status === "playing" ? (
        <button className="px-2 py-1 rounded bg-yellow-100 text-yellow-700" onClick={pause}>⏸ 暂停</button>
      ) : status === "paused" ? (
        <button className="px-2 py-1 rounded bg-green-100 text-green-700" onClick={resume}>▶️ 继续</button>
      ) : (
        <button className="px-2 py-1 rounded bg-blue-100 text-blue-700" onClick={play} disabled={!voiceReady}>🔊 播放</button>
      )}
      <button className="px-2 py-1 rounded bg-gray-100 text-gray-600" onClick={stop} disabled={status === "ready"}>⏹ 停止</button>
    </span>
  );
}
