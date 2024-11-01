import Image from "@/components/elements/Image";
import Video from "@/components/elements/Video";

import type { Image as ImageType, Video as VideoType } from "@/types";

type Props = { type: "image" | "video"; theme?: "string" } & (
  | ImageType
  | VideoType
);

const Component = (props: Props) => {
  console.log(props);

  const components: Record<string, any> = {
    image: Image,
    video: Video,
  };

  const Component = components[props.type];
  console.log(Component);

  return <Component {...props} />;
};

export default Component;
