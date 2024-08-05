import Image from "next/image";

import type { Image as ImageType } from "@/types";

type Props = ImageType;

const Component: React.FC<Props> = ({
  src,
  alt,
  width,
  height,
  theme = "default",
}) => {
  const classes: Record<string, string> = {
    default: "",
    "quote-thumb": "w-xl h-xl rounded max-w-none",
  };

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={classes[theme]}
    />
  );
};

export default Component;
