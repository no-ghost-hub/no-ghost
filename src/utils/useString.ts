import getGlobal from "@/utils/getGlobal";
import { String } from "@/payload-types";

const s = async (key: string) => {
  const { strings }: String = await getGlobal("Strings");
  const string = strings?.find((s) => s.key === key);

  return string?.value || key;
};

export { s };
