import Text from "@/components/elements/Text";
import LinksBlock from "@/components/blocks/Links";
import Medium from "@/components/groups/Medium";

// import type { ContentBlockProps } from "@/types";

type Props = any;

const ContentBlock = ({
  text,
  links,
  medium,
  background,
  theme = "default",
}: Props) => {
  const backgroundClasses: Record<string, string> = {
    default: "",
    orange: "bg-orange",
    blue: "bg-blue",
    none: "",
  };
  const themeClasses: Record<string, string> = {
    default: "min-h-screen",
    fit: "",
    full: "min-h-screen",
    contain: "min-h-screen",
  };
  const themes: Record<string, string> = {
    default: "cover",
    fit: "default",
    full: "cover",
    contain: "contain",
  };

  return (
    <div
      className={`grid ${themeClasses[theme || "default"]} ${backgroundClasses[background || "default"]}`}
    >
      {text && text !== "<p></p>" && (
        <div
          className={`z-10 col-start-1 row-start-1 content-center p-m ${medium ? "text-white" : ""}`}
        >
          <Text html={text} align="center" />
        </div>
      )}
      {links && links.length > 0 && (
        <div className="self-center">
          <LinksBlock links={links} />
        </div>
      )}
      {medium && (
        <div className="col-start-1 row-start-1 grid">
          <Medium {...medium} theme={themes[theme]} />
        </div>
      )}
    </div>
  );
};

export default ContentBlock;
