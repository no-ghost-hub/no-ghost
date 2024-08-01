import { FC } from "react";

import { Video } from "@/types";

type Props = Video;

const Component: FC<Props> = ({ src, autoplay = false, theme = "default" }) => {
  const classes: Record<string, string> = {
    default: "",
    cover: "w-full h-full object-cover",
  };

  return (
    <video
      className={classes[theme]}
      autoPlay={autoplay}
      muted={autoplay}
      loop={autoplay}
      playsInline
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default Component;
