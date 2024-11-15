type Props = {
  children?: React.ReactNode;
  html?: string;
  tag?: keyof JSX.IntrinsicElements;
  typo?: "1" | "2" | "p";
  transform?: string;
  align?: "center";
};

const Component = ({
  children,
  html,
  tag = "p",
  typo,
  transform,
  align,
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
    p: "typo-p",
  };

  const aligns: Record<string, string> = {
    center: "text-center mx-auto *:mx-auto",
  };

  return (
    <>
      {html ? (
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className={`prose ${align ? aligns[align] : ""}`}
        />
      ) : (
        <Component
          className={`${typo ? typos[typo] : tags[tag] || "typo-p"} ${transform ? transform : ""} ${align ? aligns[align] : ""}`}
        >
          {children}
        </Component>
      )}
    </>
  );
};

export default Component;
