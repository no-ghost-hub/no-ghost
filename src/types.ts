import { ReactNode } from "react";
import type { LinkProps } from "next/link";
import type { ContentBlock } from "@/payload-types";

export type Block = {
  id: string;
  blockType: string;
};

export type ContentBlockProps = ContentBlock;

export type Image = {
  src: string;
  alt: string;
  width: number;
  height: number;
  theme?: string;
};

export type Video = {
  src: string;
  poster: string;
  ratio: { x: number; y: number };
  theme?: string;
};

export type Quote = {
  title: string;
  slug: string;
  role: string;
  age: number;
  quote: string;
  image: Image;
};

export type Text = {
  children?: ReactNode;
  html?: string;
  tag?: keyof JSX.IntrinsicElements;
  typo?: string;
};

export type Link = LinkProps & { children: ReactNode };
