"use client";

import { Video } from "@/types";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import { s } from "@/utils/useClientString";

type Props = Video;

const VideoElement = ({
  src,
  poster,
  ratio,
  theme = "default",
  controls = false,
}: Props) => {
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
  }, [src]);

  const autoplays = ["default", "cover"];
  const autoplay = autoplays.includes(theme) && !controls;

  const classes: Record<string, string> = {
    default: `w-full object-cover`,
    cover: "absolute left-0 top-0 h-full w-full object-cover",
    contain: "max-h-screen max-w-full place-self-center object-contain",
  };

  const [playing, setPlaying] = useState(false);

  async function handleClick() {
    const el = videoEl.current;
    if (controls && el) {
      if (el.paused) {
        await el.play();
      } else {
        el.pause();
      }
    }
  }

  return (
    <figure className="relative grid [&>*]:col-start-1 [&>*]:row-start-1">
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
        onClick={handleClick}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {!autoplay && !playing && (
        <div className="z-10 place-self-center">
          <Link theme="button" background="white" onClick={handleClick}>
            <Text tag="div" wrap={false}>
              {s("video.play")}
            </Text>
          </Link>
        </div>
      )}
    </figure>
  );
};

export default VideoElement;
