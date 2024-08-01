import { FC } from "react";
import Image from "@/components/elements/Image";
import Video from "@/components/elements/Video";

import type { Image as ImageType, Video as VideoType } from "@/types";

type Props = { type: "image" | "video" } & (ImageType | VideoType);

const Component: FC<Props> = (props) => {
  const components = {
    image: Image,
    video: Video,
  };

  const Component = components[props.type];

  return <Component {...props} />;
};

export default Component;
