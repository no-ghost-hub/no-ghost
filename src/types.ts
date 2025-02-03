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
  controls?: boolean;
};

export type Text = {
  children?: ReactNode;
  html?: string;
  tag?: keyof React.JSX.IntrinsicElements;
  typo?: string;
};

export type Link = LinkProps & { children: ReactNode };

export type Reservation = {
  date?: string;
  time?: { from: string; to: string; type: number };
  guests?: number;
  info?: Record<string, any>;
  timeZone?: string;
  location?: string;
};

export type Order = {
  id: number;
  token: string;
  lines: { title: string; quantity: number; price: number }[];
};

export type ProductAttribute = {
  id: number;
  name: string;
  muted: boolean;
  options: { id: number; name: string; price: number }[];
};
