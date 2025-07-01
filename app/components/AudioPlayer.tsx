// /components/AudioPlayer.tsx
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa";

interface AudioPlayerProps {
  src: string;
  onPlay?: () => void;
  onPause?: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, onPlay, onPause }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    
    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      if (onPause) onPause();
    };

    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      setError("无法播放音频，请确保文件路径正确");
      setIsPlaying(false);
    };
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [onPause]);

  useEffect(() => {
    // Reset error state when src changes
    setError(null);
  }, [src]);
  
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (onPause) onPause();
    } else {
      // Ensure we're using the correct path - add leading slash if needed
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            if (onPlay) onPlay();
          })
          .catch(err => {
            console.error("Play failed:", err);
            setError("播放失败，请稍后再试");
          });
      }
    }
  };
  
  return (
    <div className="flex flex-col w-full">
      <audio ref={audioRef} src={src} preload="metadata" />
      
      <div className="flex items-center gap-3 w-full">
        <motion.button
          onClick={togglePlay}
          whileTap={{ scale: 0.95 }}
          disabled={!!error}
          className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-button disabled:opacity-60 disabled:bg-gray-400"
        >
          {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} className="ml-1" />}
        </motion.button>
        
        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary-500"
            style={{ width: `${progress}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        
        {/* Visualizer animation when playing */}
        {isPlaying && (
          <div className="flex items-center gap-1">
            {[1, 2, 3].map(i => (
              <motion.div
                key={i}
                className="w-1 bg-primary-400"
                animate={{ 
                  height: [4, 12, 4],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-2 text-xs text-red-500">{error}</div>
      )}
    </div>
  );
};
