import Image from "next/image";
import { FC } from "react";

import type { Image as ImageType } from "@/types";

type Props = ImageType;

const Component: FC<Props> = ({
  src,
  alt,
  width,
  height,
  theme = "default",
}) => {
  const classes: Record<string, string> = {
    default: "",
    "quote-thumb": "w-xl h-xl rounded",
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={classes[theme]}
    />
  );
};

export default Component;
