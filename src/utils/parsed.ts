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
      // console.log(raw, "raw");

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
    default: {
      return raw;
    }
  }
};

export default util;
