"use client";

import { useRowLabel } from "@payloadcms/ui";

const Component = () => {
  const { data } = useRowLabel<{ key: string; value: string }>();

  return <div>{data.value}</div>;
};

export default Component;
