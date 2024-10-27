import Image from "next/image";

type Props = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  theme?: string;
};

const Component = ({
  src,
  alt = "",
  width,
  height,
  theme = "default",
}: Props) => {
  const classes: Record<string, string> = {
    default: "",
  };

  const fillThemes = ["thumb"];
  const fill = fillThemes.includes(theme);

  return (
    <>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`${classes[theme]} ${fill && "object-cover"}`}
          fill={fill}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Component;
