import type {
  ContentBlock as RawContentBlock,
  TextBlock as RawTextBlock,
  QuotesBlock as RawQuotesBlock,
  FooterBlock as RawFooterBlock,
} from "@/payload-types";

export type ContentBlock = Omit<RawContentBlock, "blockType"> & {
  type: "contentBlock";
};

export type TextBlock = Omit<RawTextBlock, "blockType"> & {
  type: "textBlock";
};

export type QuotesBlock = Omit<RawQuotesBlock, "blockType"> & {
  type: "quotesBlock";
};

export type FooterBlock = Omit<RawFooterBlock, "blockType"> & {
  type: "footerBlock";
};

export type Blocks = ContentBlock[] | null | undefined;
export type ContentBlockBlocks =
  | (TextBlock | QuotesBlock | FooterBlock)[]
  | null
  | undefined;
