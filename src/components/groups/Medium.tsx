import Image from "@/components/elements/Image";
import Video from "@/components/elements/Video";
import Wrapper from "@/components/utils/Wrapper";

import type { Image as ImageType, Video as VideoType } from "@/types";
import getGlobal from "@/utils/getGlobal";

type Props = { type: "image" | "video"; theme?: string } & (
  | ImageType
  | VideoType
);

const MediumGroup = async (props: Props) => {
  const components: Record<string, any> = {
    image: Image,
    video: Video,
  };

  const Component = components[props.type];
  const { strings } = await getGlobal("strings");

  return (
    <Wrapper type="medium" context={{ strings }}>
      <Component {...props} />
    </Wrapper>
  );
};

export default MediumGroup;
