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

export type Text = {
  children?: ReactNode;
  html?: string;
  tag?: keyof React.JSX.IntrinsicElements;
  typo?: string;
};

export type Link = LinkProps & { children: ReactNode };

export type Reservation = {
  date: string | null;
  time: { from: string; to: string; type: number } | null;
  guests: number | null;
  info: Record<string, any> | null;
};
