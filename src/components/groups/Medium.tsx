import Image from "@/components/elements/Image";
import Video from "@/components/elements/Video";

import type { Image as ImageType, Video as VideoType } from "@/types";

type Props = { type: "image" | "video"; theme?: string } & (
  | ImageType
  | VideoType
);

const MediumGroup = (props: Props) => {
  const components: Record<string, any> = {
    image: Image,
    video: Video,
  };

  const Component = components[props.type];

  return <Component {...props} />;
};

export default MediumGroup;
