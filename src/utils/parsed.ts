const util = (raw: any, type?: string): any => {
  switch (type) {
    case "linkBlock": {
      return {
        ...util(raw, "link"),
      };
    }
    case "link": {
      return {
        href: raw.type === "custom" ? raw.url : `/${raw.reference?.value.slug}`,
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
    default: {
      return raw;
    }
  }
};

export default util;
