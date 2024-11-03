"use client";

import { Video } from "@/types";
import { useEffect, useRef } from "react";
import Hls from "hls.js";

type Props = Video;

const VideoElement = ({ src, poster, ratio, theme = "default" }: Props) => {
  const videoEl = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoEl.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoEl.current);
      } else if (videoEl.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoEl.current.src = src;
      }
    }
  });

  const autoplays = ["default", "cover"];
  const autoplay = autoplays.includes(theme);

  const classes: Record<string, string> = {
    default: `w-full object-cover`,
    cover: "absolute left-0 top-0 h-full w-full object-cover",
  };

  return (
    <figure className="relative">
      <video
        className={classes[theme]}
        autoPlay={autoplay}
        muted={autoplay}
        loop={autoplay}
        playsInline
        ref={videoEl}
        poster={poster}
        style={
          theme === "default" ? { aspectRatio: `${ratio.x}/${ratio.y}` } : {}
        }
      />
    </figure>
  );
};

export default VideoElement;
