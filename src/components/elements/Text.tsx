type Props = {
  children?: React.ReactNode;
  html?: string;
  tag?: keyof React.JSX.IntrinsicElements;
  typo?: "lg" | "md" | "base" | "input" | "sm";
  transform?: string;
  align?: "center";
  color?: "black" | "white" | "grey" | "orange" | "green" | "blue" | "yellow";
  wrap?: boolean;
  theme?: string;
};

const Component = ({
  children,
  html,
  tag = "p",
  typo,
  transform,
  align,
  color,
  wrap = true,
  theme = "default",
}: Props) => {
  const Component = tag;

  const tags: Record<string, string> = {
    h1: "text-lg",
    h2: "text-lg",
    h3: "text-md",
    h4: "text-md",
    h5: "text-base",
    h6: "text-base",
    p: "text-base",
  };

  const typos: Record<string, string> = {
    lg: "text-lg",
    md: "text-md",
    base: "text-base",
    input: "text-input",
    sm: "text-sm",
  };

  const aligns: Record<string, string> = {
    center: "text-center mx-auto *:mx-auto",
  };

  const colors: Record<string, string> = {
    black: "text-black",
    white: "text-white",
    grey: "text-darkgrey",
    orange: "text-orange",
    green: "text-green",
    blue: "text-blue",
    yellow: "text-yellow",
  };

  return (
    <>
      {html ? (
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className={`prose ${align ? aligns[align] : ""} ${wrap ? "w-min min-w-full" : ""}`}
        />
      ) : (
        <Component
          className={`${typo ? typos[typo] : tags[tag] || "text-base"} ${transform ? transform : ""} ${align ? aligns[align] : ""} ${color ? colors[color] : ""} ${wrap ? "w-min min-w-full" : ""}`}
        >
          {children}
        </Component>
      )}
    </>
  );
};

export default Component;
