"use client";

import generate from "@/app/hugging-face/generate";
import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import FormsText from "@/components/forms/Text";
// import { s } from "@/utils/useClientString";
import { startTransition, useActionState, useState } from "react";
import { Form, TextArea } from "react-aria-components";
import Loader from "@/components/utils/Loader";

type Music = { type: string; descriptors: string };

type Variant = {
  category: string;
  title: string;
  type: string;
  text?: string;
  music?: Music;
  description: string;
};

type Category = {
  title: string;
  slug: string;
  weight: number;
  variants: Variant[];
};

const content = [
  {
    title: "Food",
    slug: "food",
    weight: 0.4,
    variants: [
      {
        category: "food",
        title: "Preparation & serving",
        type: "video",
        music: { type: "over", descriptors: "upbeat, italo-disco, rhythmic" },
        text: "Call to action",
        description:
          "A video of a chef preparing a dish and serving it. 2 steps for preparation, cut to flashing logo, 1 step for serving.",
      },
      {
        category: "food",
        title: "List",
        type: "photos-slider",
        text: "Explain the content",
        description:
          "Slider of photos of array of items of the same category, like ingredients for a fish or all dishes of a menu section. Better if with tripod, so every picture has the same look. Everytime different angle.",
      },
      {
        category: "food",
        title: "Handheld track",
        type: "video",
        music: { type: "scene", descriptors: "adventurous, sensual, mix" },
        text: "Bit about brand philosophy",
        description:
          "From point A to point B with one take. The end is a close-up of a dish.",
      },
      {
        category: "food",
        title: "The shot",
        type: "photo",
        text: "Explain the content",
        description:
          "Artistic color-burned picture of plated food. Minimal background. 3/4.",
      },
      {
        category: "food",
        title: "POV",
        type: "video",
        text: "Comments on the goodness of the dish",
        music: { type: "over", descriptors: "dreamy, downtempo, trip-hop" },
        description:
          "POV slow-motion video of someone biting a dish, drinking from a glass, and putting it down.",
      },
    ],
  },
  {
    title: "People",
    slug: "people",
    weight: 0.2,
    variants: [
      {
        category: "people",
        title: "Table",
        type: "photo",
        text: "What they ordered",
        description:
          "Artistic dynamic picture of a specific table with clients eating. Use low field depth.",
      },
      {
        category: "people",
        title: "Staff",
        type: "photos-slider",
        music: { type: "over", descriptors: "simple wave, ambient" },
        description:
          "Title of the person on black - Video working - Logo on black",
      },
    ],
  },
  {
    title: "Cryptic",
    slug: "cryptic",
    weight: 0.1,
    variants: [
      {
        category: "cryptic",
        title: "System error",
        type: "photo",
        text: "Semi-incoherent words related to food and the brand",
        description:
          "AI-generated low-res image feeding logo, colors and one past content.",
      },
    ],
  },
  {
    title: "Text",
    slug: "text",
    weight: 0.1,
    variants: [
      {
        category: "text",
        title: "Tips",
        type: "photos-slider",
        description:
          "Title of the tip on color - Tip divided into slides - Logo on color",
      },
      {
        category: "text",
        title: "Announcement",
        type: "photo",
        text: "Text of the announcement, probably curated",
        description: "Single graphics with the title of the announcement.",
      },
    ],
  },
  {
    title: "Design",
    slug: "design",
    weight: 0.2,
    variants: [
      {
        category: "design",
        title: "Brutal",
        type: "photo",
        text: "Precise description of the characteristics",
        description: "Picture of space, interior, materials, textures, lights.",
      },
      {
        category: "design",
        title: "Flash",
        type: "video",
        music: { type: "scene", descriptors: "noisy, texture, glitch" },
        description:
          "Looping video. Like a gif. Fixed shot, like light changing color or flashing the color burn over a detail image.",
      },
    ],
  },
];

const pickCategory = (categories: Category[]): Category => {
  const random = Math.random();
  const cumulativeWeights = categories.reduce<
    { category: Category; threshold: number }[]
  >((acc, category, index) => {
    const threshold = (acc[index - 1]?.threshold || 0) + category.weight;
    acc.push({ category, threshold });
    return acc;
  }, []);

  return cumulativeWeights.find(({ threshold }) => random < threshold)!
    .category;
};

const pickVariant = (content: Category[]): Variant | null => {
  const category = pickCategory(content);
  return category.variants.length > 0
    ? category.variants[Math.floor(Math.random() * category.variants.length)]
    : null;
};

const GeneratorPage = ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const [variant, setVariant] = useState<Variant | null>(null);

  function handleGenerate() {
    setVariant(pickVariant(content));
  }

  const [result, formAction, pending] = useActionState(generate, null);

  return (
    <main className="gap-l pt-m pb-l grid">
      {/* <div className="px-xs">
        <Text tag="h1">Generator</Text>
      </div> */}
      {/* <div className="px-xs gap-m grid">
        {content.map(({ slug, title, variants }) => (
          <div key={slug} className="gap-s grid">
            <Text tag="h5">{title}</Text>
            <div className="gap-xs grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] items-start">
              {variants.map((variant) => (
                <Card key={variant.title} {...variant} />
              ))}
            </div>
          </div>
        ))}
      </div> */}
      <div className="p-xs gap-s grid justify-self-center bg-white">
        <Form action={formAction} className="gap-s grid">
          <FormsText name="prompt" type="textarea" label="What?" />
          <Link theme="button" background="blue">
            <Text tag="div">AI magic</Text>
          </Link>
        </Form>
        {pending ? <Loader /> : <>{result}</>}
      </div>
      <div className="px-xs justify-self-center">
        <Link onClick={handleGenerate} theme="button" background="blue">
          <Text tag="div" typo="lg">
            Generate
          </Text>
        </Link>
      </div>
      {variant && (
        <div className="px-xs grid w-full max-w-(--breakpoint-md) justify-self-center">
          <Card {...variant} />
        </div>
      )}
    </main>
  );
};

export default GeneratorPage;

const Card = ({ category, title, type, text, music, description }: Variant) => {
  // const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="grid">
      <div className="grid grid-flow-col justify-between">
        <div className="p-xs bg-darkgrey">
          <Text typo="sm" wrap={false} transform="uppercase">
            {type}
          </Text>
        </div>
      </div>
      <div className={`p-xs gap-s grid bg-white`}>
        <Text typo="sm" wrap={false} transform="uppercase">
          {content.find((c) => c.slug === category)?.title}
        </Text>
        <Text tag="h3">{title}</Text>
        <Text>{description}</Text>
      </div>
      {text && (
        <div className={`p-xs bg-yellow`}>
          <Text typo="sm">
            Text <br />
            {text}
          </Text>
        </div>
      )}
      {music && (
        <div className={`p-xs bg-green`}>
          <Text typo="sm">
            Music <br />
            Type: {music?.type} <br />
            Descriptors: {music?.descriptors} <br />
          </Text>
        </div>
      )}
    </div>
  );
};
