import { Text } from "@/types";

type Props = Text;

const Component: React.FC<Props> = ({ children, html, tag = "p", typo }) => {
  const Component = tag;

  const typos: Record<string, string> = {
    h1: "1",
    h2: "2",
    h3: "2",
    h4: "2",
    h5: "3",
    h6: "3",
    p: "p",
  };

  return (
    <>
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} className="prose" />
      ) : (
        <Component className={`typo-${typo || typos[tag] || "p"}`}>
          {children}
        </Component>
      )}
    </>
  );
};

export default Component;
