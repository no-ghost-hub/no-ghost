"use client";

import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import FormsText from "@/components/forms/Text";
// import { s } from "@/utils/useClientString";
import { JSX, startTransition, useActionState, useState } from "react";
import {
  FileTrigger,
  Form,
  TextArea,
  ToggleButton,
  ToggleButtonGroup,
} from "react-aria-components";
import Loader from "@/components/utils/Loader";
import MonogramSvg from "@/assets/vectors/monogram.svg";
import Carousel from "@/components/elements/Carousel";
import ImageHandler from "@/components/utils/ImageHandler";
import generate from "@/app/hugging-face/generate";
import Image from "@/components/elements/Image";

import terraPic from "./../images/terra.jpg";
import yelPic from "./../images/yel.jpg";
import bPic from "./../images/b.jpg";
import sassaraPic from "./../images/sassara.jpg";

type Music = { type: string; descriptors: string };

type Variant = {
  id: string;
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
        id: "preparation-serving",
        category: "food",
        title: "Preparation & serving",
        type: "video",
        music: { type: "over", descriptors: "upbeat, italo-disco, rhythmic" },
        text: "Call to action",
        description:
          "A video of a chef preparing a dish and serving it. 2 steps for preparation, cut to flashing logo, 1 step for serving. The format can also be applied to more generic storytelling, like showing how specific beers were selected.",
      },
      {
        id: "list",
        category: "food",
        title: "List",
        type: "slider",
        text: "Explain the content",
        description:
          "Slider of photos of array of items of the same category, like ingredients for a fish or all dishes of a menu section. Better if with tripod, so every picture has the same look. Everytime different angle.",
      },
      {
        id: "handheld-track",
        category: "food",
        title: "Handheld track",
        type: "video",
        music: { type: "scene", descriptors: "adventurous, sensual, mix" },
        text: "Bit about brand philosophy",
        description:
          "From point A to point B with one take. The end is a close-up of a dish.",
      },
      {
        id: "the-shot",
        category: "food",
        title: "The shot",
        type: "photo",
        text: "Explain the content",
        description:
          "Artistic color-burned picture of plated food. Minimal background. 3/4.",
      },
      {
        id: "pov",
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
        id: "table",
        category: "people",
        title: "Table",
        type: "photo",
        text: "What they ordered",
        description:
          "Artistic dynamic picture of a specific table with clients eating. Use low field depth.",
      },
      // {
      //   id: 7,
      //   category: "people",
      //   title: "Staff",
      //   type: "slider",
      //   music: { type: "over", descriptors: "simple wave, ambient" },
      //   description:
      //     "Title of the person on black - Video working - Logo on black",
      // },
    ],
  },
  {
    title: "Cryptic",
    slug: "cryptic",
    weight: 0.1,
    variants: [
      {
        id: "system-error",
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
        id: "tips",
        category: "text",
        title: "Tips",
        type: "slider",
        description:
          "Title of the tip on color - Tip divided into slides - Logo on color",
      },
      {
        id: "announcement",
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
        id: "brutal",
        category: "design",
        title: "Brutal",
        type: "photo",
        text: "Precise description of the characteristics",
        description: "Picture of space, interior, materials, textures, lights.",
      },
      {
        id: "flash",
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

const DailyPage = ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const [variant, setVariant] = useState<Variant | null>(null);

  function handleGenerate(variant: Variant) {
    setVariant(variant);
  }

  function handleRandomGenerate() {
    setVariant(pickVariant(content));
  }

  return (
    <main className="gap-l pt-m pb-l mx-auto grid max-w-(--breakpoint-md)">
      <div className="">
        <Text tag="h1">Daily content</Text>
      </div>
      <div className="gap-x-xs gap-y-m px-xs grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] items-start">
        <div className="gap-m grid">
          <div className="grid">
            <Link
              onClick={handleRandomGenerate}
              theme="button"
              background="blue"
            >
              <Text tag="div" typo="md">
                Generate random
              </Text>
            </Link>
          </div>
          <div className="gap-m grid">
            {content.map(({ slug, title, variants }) => (
              <div key={slug} className="gap-s grid">
                <Text tag="h5">{title}</Text>
                <div className="gap-xs grid items-start">
                  {variants.map((variant) => (
                    <Thumb
                      key={variant.title}
                      {...variant}
                      onGenerate={() => handleGenerate(variant)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="gap-s grid">
          {variant && (
            <div className="grid w-full">
              <Card {...variant} />
            </div>
          )}
          {/* <Form action={formAction} className="gap-s grid">
            <FormsText name="prompt" type="textarea" label="What?" />
            <Link theme="button" background="blue">
              <Text tag="div">AI magic</Text>
            </Link>
          </Form>
          {pending ? <Loader /> : <>{result}</>} */}
        </div>
      </div>
    </main>
  );
};

export default DailyPage;

const Thumb = ({
  category,
  title,
  type,
  text,
  music,
  description,
  onGenerate,
  theme = "default",
}: Variant & { onGenerate?: () => void; theme?: string }) => {
  return (
    <div className="gap-xs grid grid-flow-col grid-cols-[auto_1fr_auto] items-center bg-white">
      <div className="p-xs bg-darkgrey">
        <Text typo="sm" wrap={false} transform="uppercase">
          {type}
        </Text>
      </div>
      <Text tag="h3">{title}</Text>
      <Link theme="button" background="blue" onClick={onGenerate}>
        <Text tag="div">Generate</Text>
      </Link>
    </div>
  );
};

const Card = ({
  id,
  category,
  title,
  type,
  text,
  music,
  description,
}: Variant) => {
  const examples: Record<string, JSX.Element> = {
    "preparation-serving": <PreparationServing />,
    list: <List />,
    "handheld-track": <HandheldTrack />,
    "the-shot": <TheShot />,
    "system-error": <SystemError />,
  };

  return (
    <div className="gap-m grid">
      <div className={`grid bg-white`}>
        <div className="grid grid-flow-col justify-between">
          <div className="p-xs">
            <Text typo="sm" wrap={false} transform="uppercase">
              {content.find((c) => c.slug === category)?.title}
            </Text>
          </div>
          <div className="p-xs bg-darkgrey">
            <Text typo="sm" wrap={false} transform="uppercase">
              {type}
            </Text>
          </div>
        </div>
        <div className="gap-s p-xs grid">
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
      <div className="gap-xs grid">
        {/* <Text>Example & generation</Text> */}
        {examples[id]}
      </div>
    </div>
  );
};

const PreparationServing = () => {
  return (
    <div className="grid bg-black">
      <div className="bg-orange animate-flash grid aspect-[4/5] place-content-center">
        <MonogramSvg className="h-l" />
      </div>
      <div className="p-xs">
        <Text color="white">Preview</Text>
      </div>
    </div>
  );
};

const List = () => {
  const slides = [terraPic, yelPic, bPic, sassaraPic];

  return (
    <div className="grid bg-black">
      <Carousel>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="swiper-slide bg-green grid aspect-[4/5] place-content-center"
          >
            <Image src={slide} />
          </div>
        ))}
      </Carousel>
      <div className="p-xs">
        <Text color="white">Preview</Text>
      </div>
    </div>
  );
};

const HandheldTrack = () => {
  return (
    <div className="grid bg-black">
      <div className="bg-darkgrey grid aspect-[4/5] place-content-center">
        <Text align="center">Video</Text>
      </div>
      <div className="p-xs">
        <Text color="white">Preview</Text>
      </div>
    </div>
  );
};

const TheShot = () => {
  return (
    <div className="grid bg-black">
      <ImageHandler />
      <div className="p-xs">
        <Text color="white">Preview</Text>
      </div>
    </div>
  );
};

const SystemError = () => {
  const [image, setImage] = useState<File | null>(null);
  const [selectedColors, setColors] = useState(["orange"]);
  const [result, formAction, pending] = useActionState(
    generate.bind(null, image, selectedColors),
    null,
  );

  const colors: {
    id: string;
    name: string;
  }[] = [
    {
      id: "orange",
      name: "Orange",
    },
    {
      id: "blue",
      name: "Blue",
    },
    {
      id: "green",
      name: "Green",
    },
    {
      id: "yellow",
      name: "Yellow",
    },
  ];

  return (
    <div className="grid bg-black">
      <Form action={formAction} className="grid bg-white">
        <FileTrigger
          acceptedFileTypes={["image/*"]}
          onSelect={(fileList) => {
            const files = Array.from(fileList || []);
            setImage(files[0]);
          }}
        >
          <div className="grid">
            <Link theme="button" background="orange">
              <Text>Upload</Text>
            </Link>
          </div>
        </FileTrigger>
        <ToggleButtonGroup
          selectionMode="multiple"
          selectedKeys={selectedColors}
          onSelectionChange={(keys) => setColors(Array.from(keys) as string[])}
          className="grid grid-flow-col"
          disallowEmptySelection={true}
        >
          {colors.map(({ id, name }) => (
            <ToggleButton
              key={id}
              id={id}
              className="custom-underline data-selected:bg-grey cursor-pointer"
            >
              <div className="p-xs">
                <Text tag="div" wrap={false}>
                  {name}
                </Text>
              </div>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Link theme="button" background="blue" type="submit">
          <Text tag="div">Corrupt</Text>
        </Link>
      </Form>
      <div className="bg-darkgrey grid aspect-[4/5]">
        {pending ? (
          <Loader />
        ) : (
          <>
            {result?.error && <Text>{result.error}</Text>}
            {result?.data ? (
              <Image
                src={`data:image;base64,${result.data.image}`}
                width={512}
                height={640}
              />
            ) : image ? (
              <Image src={URL.createObjectURL(image)} theme="cover" />
            ) : (
              <div className="place-self-center">
                <Text align="center" wrap={false}>
                  Previous image
                </Text>
              </div>
            )}
          </>
        )}
      </div>
      <div className="p-xs">
        <Text color="white">Preview</Text>
      </div>
    </div>
  );
};
