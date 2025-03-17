"use client";

import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";
import { s } from "@/utils/useClientString";
import { useState } from "react";

type Props = {
  code: string;
};

const PromotionBlockClient = ({ code }: Props) => {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <Link theme="bleed-button" onClick={copy}>
      <div className="gap-y-xs grid grid-flow-col grid-cols-[1fr]">
        <div className="p-xs">
          <Text wrap={false}>{code}</Text>
        </div>
        <div className="bg-green p-xs">
          <Text tag="div">{s(copied ? "ctas.copied" : "ctas.copy")}</Text>
        </div>
      </div>
    </Link>
  );
};

export default PromotionBlockClient;
