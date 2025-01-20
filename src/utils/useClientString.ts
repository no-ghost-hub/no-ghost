import { Context } from "@/components/providers/Global";
import { useContext } from "react";

const s = (key: string) => {
  const { strings } = useContext(Context);

  const string = strings?.find((s) => s.key === key);
  return string?.value || key;
};

export { s };
