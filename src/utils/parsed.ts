const util = (raw: any, type?: string): any => {
  switch (type) {
    case "linkBlock": {
      return {
        ...util(raw, "link"),
      };
    }
    case "link": {
      const href =
        raw.type === "custom" ? raw.url : `/${raw.reference?.value.slug}`;
      return {
        href: href === raw.homeHref ? "/" : href,
        text: raw.text || raw.reference?.value.title,
      };
    }
    case "category": {
      return {
        title: raw.name,
        products: raw.products,
      };
    }
    case "product-thumb": {
      return {
        title: raw.name,
        image: raw.image,
        price: raw.price,
        description: raw.description,
      };
    }
    case "settings": {
      return {
        currency: raw.business_currency,
      };
    }
    case "Site": {
      return {
        title: raw.title,
        home: { slug: raw.home.value.slug, href: `/${raw.home.value.slug}` },
        description: raw.description,
      };
    }
    case "logoBlock": {
      return {
        medium: raw.medium.length
          ? util(raw.medium[0], raw.medium[0].blockType)
          : undefined,
        theme: raw.logoTheme,
        background: raw.logoBackground,
      };
    }
    case "contentBlock": {
      return {
        text: raw.text,
        links: raw.links,
        medium: raw.medium.length
          ? util(raw.medium[0], raw.medium[0].blockType)
          : undefined,
        theme: raw.contentTheme,
        background: raw.contentBackground,
      };
    }
    case "imageBlock": {
      return {
        type: "image",
        ...util(raw.image, "image"),
      };
    }
    case "videoBlock": {
      return {
        type: "video",
        ...util(raw, "video"),
      };
    }
    case "image": {
      return {
        src: raw.url,
        alt: raw.alt,
        width: raw.width,
        height: raw.height,
      };
    }
    case "video": {
      return {
        src: raw.src,
        poster: raw.poster?.url,
        ratio: raw.ratio,
      };
    }
    default: {
      return raw;
    }
  }
};

export default util;
