"use client";
import { forwardRef, useCallback, useEffect, useRef, type VideoHTMLAttributes } from "react";

const managedVideos = new Set<HTMLVideoElement>();

const ManagedVideo = forwardRef<HTMLVideoElement, VideoHTMLAttributes<HTMLVideoElement>>(function ManagedVideo({ muted, onVolumeChange, ...props }, forwardedRef) {
  const localRef = useRef<HTMLVideoElement>(null);
  const setRef = useCallback((video: HTMLVideoElement | null) => {
    localRef.current = video;
    if (typeof forwardedRef === "function") forwardedRef(video);
    else if (forwardedRef) forwardedRef.current = video;
  }, [forwardedRef]);

  useEffect(() => {
    const video = localRef.current;
    if (!video) return;
    video.muted = true;
    managedVideos.add(video);
    const muteBeforeLoop = () => {
      if (video.loop && Number.isFinite(video.duration) && video.duration > 0 && video.duration - video.currentTime <= 0.5) {
        video.muted = true;
      }
    };
    video.addEventListener("timeupdate", muteBeforeLoop);
    return () => {
      video.removeEventListener("timeupdate", muteBeforeLoop);
      managedVideos.delete(video);
    };
  }, []);

  const handleVolumeChange: NonNullable<VideoHTMLAttributes<HTMLVideoElement>["onVolumeChange"]> = (event) => {
    const video = event.currentTarget;
    if (!video.muted) {
      managedVideos.forEach((other) => {
        if (other !== video && !other.muted) other.muted = true;
      });
    }
    onVolumeChange?.(event);
  };

  return <video {...props} ref={setRef} muted={muted ?? true} onVolumeChange={handleVolumeChange} />;
});

export default ManagedVideo;