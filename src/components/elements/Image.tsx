import { StaticImport } from "next/dist/shared/lib/get-img-props";
import NextImage from "next/image";

type Props = {
  src?: string | StaticImport;
  alt?: string;
  width?: number;
  height?: number;
  theme?: string;
};

const fillThemes = ["thumb", "cover"];
const classes: Record<string, string> = {
  default: "w-full",
};

const Image = ({ src, alt = "", width, height, theme = "default" }: Props) => {
  const fill = fillThemes.includes(theme);

  return (
    <figure className="grid">
      {src ? (
        <picture className="relative">
          <NextImage
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

export default Image;
