import Image from "@/components/elements/Image";
import Video from "@/components/elements/Video";

import type { Image as ImageType, Video as VideoType } from "@/types";

type Props = { type: "image" | "video" } & (ImageType | VideoType);

const Component: React.FC<Props> = (props) => {
  const components: Record<string, React.FC<any>> = {
    image: Image,
    video: Video,
  };

  const Component = components[props.type];

  return <Component {...props} />;
};

export default Component;
