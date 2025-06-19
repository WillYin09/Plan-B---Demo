// /components/AudioPlayer.tsx
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AudioPlayerProps {
  src: string;
  autoPlay?: boolean;
  onEnded?: () => void;
  style?: React.CSSProperties;
  onPlay?: () => void;
  onPause?: () => void;
  compact?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src, 
  autoPlay, 
  onEnded, 
  style, 
  onPlay, 
  onPause,
  compact = false
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Update duration once audio is loaded
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Update progress during playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const interval = setInterval(updateProgress, 100);
    return () => clearInterval(interval);
  }, [playing]);

  const handlePlay = () => {
    audioRef.current?.play();
    setPlaying(true);
    onPlay?.();
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setPlaying(false);
    onPause?.();
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    
    audioRef.current.currentTime = pos * audioRef.current.duration;
    setProgress(pos * 100);
  };

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      style={style} 
      className={`flex ${compact ? 'flex-row gap-2' : 'flex-col w-full'} items-center`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <audio
        ref={audioRef}
        src={src}
        autoPlay={autoPlay}
        onEnded={() => { setPlaying(false); onEnded?.(); }}
      />
      
      {!compact && (
        <div className="w-full mb-2">
          <div 
            className="w-full h-2 bg-secondary-100 rounded-full overflow-hidden cursor-pointer"
            onClick={handleProgressClick}
          >
            <motion.div 
              className="h-full bg-primary-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "tween", ease: "linear", duration: 0.1 }}
            />
          </div>
          
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>{formatTime((progress / 100) * duration)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}
      
      <motion.button
        onClick={playing ? handlePause : handlePlay}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-1 transition ${
          playing
            ? "bg-secondary-500 text-white"
            : "bg-primary-500 text-white"
        } px-4 py-2 rounded-full shadow-button`}
      >
        <span className="text-xs">
          {playing ? "⏸️" : "▶️"}
        </span>
        <span className="font-medium">
          {playing ? "暂停" : "播放"}
        </span>
      </motion.button>
    </motion.div>
  );
};
