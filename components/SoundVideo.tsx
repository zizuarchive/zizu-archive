"use client";
import { useRef, useState } from "react";
import ManagedVideo from "./ManagedVideo";

export default function SoundVideo({ src, poster, alt, focus }: { src: string; poster?: string; alt: string; focus?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const toggleSound = () => {
    const video = containerRef.current?.querySelector("video");
    if (!video) return;
    if (!muted) {
      video.muted = true;
      setMuted(true);
      return;
    }

    video.pause();
    video.currentTime = 0;
    video.muted = false;
    const playback = video.play();
    setMuted(false);
    void playback.catch(() => {
      video.muted = true;
      setMuted(true);
    });
  };
  const togglePlayback = (event: React.MouseEvent<HTMLVideoElement>) => {
    event.stopPropagation();
    const video = event.currentTarget;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  };

  return (
    <div ref={containerRef} className="sound-video">
      <ManagedVideo src={src} poster={poster} autoPlay muted={muted} loop playsInline aria-label={alt} onClick={togglePlayback} onVolumeChange={(event) => setMuted(event.currentTarget.muted)} style={{ objectPosition: focus, opacity: 1 }} />
      <button className="video-sound-toggle" type="button" onClick={(event) => { event.stopPropagation(); toggleSound(); }} aria-label={muted ? "Enable sound" : "Mute sound"} aria-pressed={!muted}>
        {muted ? "Enable sound" : "Mute sound"}
      </button>
    </div>
  );
}