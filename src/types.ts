import type {
  ContentBlock as RawContentBlock,
  TextBlock as RawTextBlock,
  QuotesBlock as RawQuotesBlock,
  FooterBlock as RawFooterBlock,
} from "@/payload-types";

export type TextBlock = Omit<RawTextBlock, "blockType"> & {
  type: "textBlock";
};

export type QuotesBlock = Omit<RawQuotesBlock, "blockType"> & {
  type: "quotesBlock";
};

export type FooterBlock = Omit<RawFooterBlock, "blockType"> & {
  type: "footerBlock";
};

export type ContentBlockBlocks =
  | (TextBlock | QuotesBlock | FooterBlock)[]
  | null
  | undefined;

export type ContentBlock = Omit<RawContentBlock, "blocks" | "blockType"> & {
  blocks: ContentBlockBlocks;
  type: "contentBlock";
};

export type Blocks = ContentBlock[] | null | undefined;
