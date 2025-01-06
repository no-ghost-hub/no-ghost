import formatDecimalTime from "@/utils/formatDecimalTime";

const odooColors: Record<string, string> = {
  "2": "orange",
  "8": "blue",
};

const parsed = (raw: any, type?: string): any => {
  switch (type) {
    case "linkBlock": {
      return {
        ...parsed(raw, "link"),
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
    case "menuGroup": {
      const slug = raw.x_studio_char_field_41e_1icocg5tb;
      return {
        name: raw.name,
        slug,
        url: `/menu?group=${slug}`,
        hourFrom: raw.hour_after,
        hourTo: raw.hour_until,
        color: odooColors[raw.color],
      };
    }
    case "category": {
      return {
        title: raw.name,
        products: raw.products,
      };
    }
    case "productThumb": {
      return {
        id: raw.id,
        title: raw.name,
        image: `data:image;base64,${raw.image_1024}`,
        price: raw.tax_string.match(/-?\d*\.?\d+/)?.[0] || raw.list_price,
        description: raw.public_description,
      };
    }
    case "company": {
      return {
        currency: raw.currency_id[1],
      };
    }
    case "reservations": {
      return raw.map((reservation: any) => parsed(reservation, "reservation"));
    }
    case "reservation": {
      return {
        from: raw.event_start,
        to: raw.event_stop,
        capacity: raw.capacity_reserved,
      };
    }
    case "reservationDates": {
      const weekdays = Array.from(
        new Set(raw.map((slot: any) => (parseInt(slot.weekday) + 6) % 7)),
      );
      const times = raw.map(
        ({ start_hour, end_hour, appointment_type_id, weekday }: any) => ({
          from: formatDecimalTime(start_hour),
          to: formatDecimalTime(end_hour),
          weekday: parseInt(weekday),
          type: appointment_type_id[0],
        }),
      );

      return {
        weekdays,
        times,
      };
    }
    case "reservationTypes": {
      return {
        types: raw.map((type: any) => parsed(type, "reservationType")),
        maxCapacity: raw.reduce(
          (acc: number, { resource_total_capacity: capacity }: any) => {
            return capacity > acc ? capacity : acc;
          },
          0,
        ),
      };
    }
    case "reservationType": {
      return {
        id: raw.id,
        name: raw.name,
        slug: raw.x_studio_slug,
        location: raw.location,
        timeZone: raw.appointment_tz,
      };
    }
    case "site": {
      return {
        title: raw.title,
        home: { slug: raw.home.value.slug, href: `/${raw.home.value.slug}` },
        description: raw.description,
      };
    }
    case "logoBlock": {
      return {
        medium: raw.medium.length
          ? parsed(raw.medium[0], raw.medium[0].blockType)
          : undefined,
        theme: raw.theme,
        background: raw.background,
      };
    }
    case "contentBlock": {
      return {
        text: raw.text,
        links: raw.links,
        medium: raw.medium.length
          ? parsed(raw.medium[0], raw.medium[0].blockType)
          : undefined,
        theme: raw.theme,
        background: raw.background,
      };
    }
    case "imageBlock": {
      return {
        type: "image",
        ...parsed(raw.image, "image"),
      };
    }
    case "videoBlock": {
      return {
        type: "video",
        ...parsed(raw, "video"),
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
        theme: raw.theme,
        controls: raw.controls,
      };
    }
    default: {
      return raw;
    }
  }
};

export default parsed;
