"use client";
import React, { useState, useRef, useEffect } from "react";

interface Props {
  text: string;
}

const audioCache: Map<string, string> = new Map();

export default function MeditationAudioPlayer({ text }: Props) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "generating" | "ready" | "playing" | "paused" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  // 调用硅基流动 TTS
  async function generateAudio() {
    setStatus("generating");
    setError(null);
    if (audioCache.has(text)) {
      setAudioUrl(audioCache.get(text)!);
      setStatus("ready");
      return;
    }
    try {
      const res = await fetch(`/api/tts?text=${encodeURIComponent(text)}`);
      if (!res.ok) throw new Error(await res.text());
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      audioCache.set(text, url);
      setAudioUrl(url);
      setStatus("ready");
    } catch (e) {
      setStatus("error");
      setError("语音合成失败，请重试");
    }
  }

  // 文案变化自动生成音频
  useEffect(() => {
    setAudioUrl(null);
    setProgress(0);
    if (text && text.length > 0) {
      generateAudio();
    }
    // eslint-disable-next-line
  }, [text]);

  // 进度条同步
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    function onTimeUpdate() {
      if (audio.duration && !isNaN(audio.duration)) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    }
    function onEnded() {
      setStatus("ready");
    }
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [audioUrl]);

  // 控制
  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play();
    setStatus("playing");
  };
  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setStatus("paused");
  };
  const replay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    setStatus("playing");
  };
  const seek = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = Math.min(audio.currentTime + seconds, audio.duration);
  };

  const onSeekBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const pct = Number(e.target.value);
    audio.currentTime = (pct / 100) * audio.duration;
    setProgress(pct);
  };

  return (
    <div className="w-full flex flex-col items-center my-6">
      {status === "generating" && (
        <div className="text-gray-500 animate-pulse my-3">语音生成中…</div>
      )}
      {status === "error" && (
        <div className="text-red-500 my-3">{error}</div>
      )}
      <audio ref={audioRef} src={audioUrl ?? undefined} />
      <div className="flex flex-row gap-4 items-center w-full justify-center">
        {/* 播放/暂停 */}
        {(status === "ready" || status === "paused") ? (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
            onClick={play}
            disabled={status === "generating" || !audioUrl}
          >
            ▶️ 播放
          </button>
        ) : status === "playing" ? (
          <button
            className="px-4 py-2 bg-yellow-400 text-white rounded-xl shadow hover:bg-yellow-500 transition"
            onClick={pause}
          >
            ⏸️ 暂停
          </button>
        ) : null}

        {/* 快进 */}
        <button
          className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
          onClick={() => seek(10)}
          disabled={!audioUrl}
        >
          ⏩ +10秒
        </button>

        {/* 重播 */}
        <button
          className="px-3 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition"
          onClick={replay}
          disabled={!audioUrl}
        >
          🔁 重播
        </button>
      </div>
      {/* 进度条 */}
      <div className="w-full mt-3 flex flex-col items-center">
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={onSeekBarChange}
          className="w-72 accent-green-400"
          disabled={!audioUrl}
        />
        <div className="text-xs text-gray-400 mt-1">
          {status === "playing" && "播放中"}
          {status === "paused" && "已暂停"}
          {status === "ready" && "可播放"}
          {status === "generating" && "语音生成中…"}
          {status === "error" && "生成失败"}
        </div>
      </div>
    </div>
  );
}
