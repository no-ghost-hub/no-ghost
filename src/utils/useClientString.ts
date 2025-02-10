import { Context } from "@/components/providers/Global";
import { useContext } from "react";

const s = (key?: string) => {
  const { strings } = useContext(Context);

  const string = strings?.find((s) => s.key === key);
  return string?.value || key;
};

const useString = () => {
  const { strings } = useContext(Context);
  return (key: string) => strings?.find((s) => s.key === key)?.value || key;
};

export { s, useString };
