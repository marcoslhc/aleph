import React, { useRef, useCallback, useState, useEffect } from "react";
const usePlayer = () => {
  const [isPlaying, setIsPlaying] = useState<Boolean>(false);
  const player = useRef<HTMLMediaElement>(null);

  useEffect(() => {
    const cb = (e: any) => {
      const { type } = e;
      setIsPlaying((isPlaying) => (type === "pause" ? false : true));
    };
    player.current?.addEventListener("playing", cb);
    player.current?.addEventListener("play", cb);
    player.current?.addEventListener("pause", cb);
    return () => {
      player.current?.removeEventListener("playing", cb);
      player.current?.removeEventListener("play", cb);
      player.current?.removeEventListener("pause", cb);
    };
  }, [setIsPlaying, player]);

  const handleSeekBack = useCallback(
    (e) => {
      if (!player.current) return;
      player.current.currentTime -= 15;
    },
    [player],
  );
  const handleSeekForward = useCallback(
    (e) => {
      if (!player.current) return;
      player.current.currentTime += 15;
    },
    [player],
  );
  const handlePlayPause = useCallback(() => {
    if (!player.current) return;
    if (player.current.paused && player.current.readyState >= 2)
      player.current.play();
    else player.current.pause();
  }, [player]);

  return {
    player,
    handlePlayPause,
    handleSeekBack,
    handleSeekForward,
    isPlaying,
  };
};

interface PlayerProps {
  src: string;
}

export const Player: React.FC<PlayerProps> = ({ src = "" }) => {
  const {
    handleSeekBack,
    handlePlayPause,
    handleSeekForward,
    player,
    isPlaying,
  } = usePlayer();
  const [mediaURL, setMediaURL] = useState("");

  useEffect(() => {
    setMediaURL(src);
    return () => setMediaURL("");
  }, [src, setMediaURL]);
  return (
    <div>
      <div onClick={handleSeekBack}> -15 secs</div>
      <div onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</div>
      <div onClick={handleSeekForward}> +15 secs</div>
      {mediaURL && <audio ref={player} src={mediaURL} />}
    </div>
  );
};
export default Player;
