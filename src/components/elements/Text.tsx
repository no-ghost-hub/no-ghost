type Props = {
  children?: React.ReactNode;
  html?: string;
  tag?: keyof React.JSX.IntrinsicElements;
  typo?: "1" | "2" | "3" | "p" | "input" | "note";
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
    h1: "typo-1",
    h2: "typo-1",
    h3: "typo-2",
    h4: "typo-2",
    h5: "typo-p",
    h6: "typo-p",
    p: "typo-p",
  };

  const typos: Record<string, string> = {
    "1": "typo-1",
    "2": "typo-2",
    "3": "typo-3",
    p: "typo-p",
    input: "typo-input",
    note: "typo-note",
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
          className={`${typo ? typos[typo] : tags[tag] || "typo-p"} ${transform ? transform : ""} ${align ? aligns[align] : ""} ${color ? colors[color] : ""} ${wrap ? "w-min min-w-full" : ""}`}
        >
          {children}
        </Component>
      )}
    </>
  );
};

export default Component;
