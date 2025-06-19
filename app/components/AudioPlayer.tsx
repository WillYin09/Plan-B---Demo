// /components/AudioPlayer.tsx
import React, { useRef, useState } from "react";

interface AudioPlayerProps {
  src: string;
  autoPlay?: boolean;
  onEnded?: () => void;
  style?: React.CSSProperties;
  onPlay?: () => void;
  onPause?: () => void;
}
export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src, autoPlay, onEnded, style, onPlay, onPause
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

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

  return (
    <div style={style} className="flex gap-2 items-center">
      <audio
        ref={audioRef}
        src={src}
        autoPlay={autoPlay}
        onEnded={() => { setPlaying(false); onEnded?.(); }}
      />
      {playing ? (
        <button onClick={handlePause} className="px-2 py-1 bg-gray-200 rounded">⏸️ 暂停</button>
      ) : (
        <button onClick={handlePlay} className="px-2 py-1 bg-blue-200 rounded">▶️ 播放</button>
      )}
    </div>
  );
};
