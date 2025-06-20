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
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onPause]);
  
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (onPause) onPause();
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      if (onPlay) onPlay();
    }
  };
  
  return (
    <div className="flex items-center gap-3 w-full">
      <audio ref={audioRef} src={src} />
      
      <motion.button
        onClick={togglePlay}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-button"
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
  );
};
