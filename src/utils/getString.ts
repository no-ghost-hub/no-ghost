import getGlobal from "@/utils/getGlobal";

const util = async (key: string) => {
  const { strings } = await getGlobal("Strings");
  const string = strings.find((s) => s.key === key);

  return string?.value;
};

export default util;
