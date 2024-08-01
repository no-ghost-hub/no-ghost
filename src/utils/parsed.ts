import type { Quote } from "@/payload-types";

const util = (raw: any, type?: string): any => {
  switch (type) {
    case "image":
      return {
        src: raw.url,
        alt: raw.alt,
        width: raw.width,
        height: raw.height,
      };
    case "video":
      return {
        src: raw.src,
        poster: util(raw.poster, "image"),
        ratio: raw.ratio,
      };
    case "videoBlock":
      return { ...util(raw.video, "video"), autoplay: false, type: "video" };
    case "contentBlock":
      return {
        sideMedium: raw.medium.medium[0],
        blocks: raw.blocks,
      };
    case "textBlock":
      return {
        text: raw.textHTML,
      };
    case "quotesBlock":
      return {
        slugs: raw.quotes.map((quote: Quote) => quote.slug),
      };
    case "quoteThumb":
      return {
        title: raw.title,
        slug: raw.slug,
        role: raw.role,
        age: raw.age,
        quote: raw.quote,
        image: util(raw.image, "image"),
      };
    case "menu":
      return {
        title: raw.value.title,
        slug: raw.value.slug,
        items: raw.value.items,
      };
    case "link":
      return {
        href: raw.type === "custom" ? raw.url : raw.reference,
        icon: raw.icon,
        text: raw.text,
      };
    default:
      return raw;
  }
};

export default util;
