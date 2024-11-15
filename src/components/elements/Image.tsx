import Image from "next/image";

type Props = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  theme?: string;
};

const fillThemes = ["thumb", "cover"];
const classes: Record<string, string> = {
  default: "w-full",
};

const ImageElement = ({
  src,
  alt = "",
  width,
  height,
  theme = "default",
}: Props) => {
  const fill = fillThemes.includes(theme);

  return (
    <figure className="grid">
      {src ? (
        <picture className="relative">
          <Image
            src={src}
            alt={alt}
            className={`${classes[theme] || classes["default"]} ${fill && "object-cover"}`}
            fill={fill}
            {...(!fill && { width, height })}
          />
        </picture>
      ) : (
        <div />
      )}
    </figure>
  );
};

export default ImageElement;
