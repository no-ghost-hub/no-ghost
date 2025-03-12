"use server";

const promptColors: Record<string, string> = {
  orange: "bright orange",
  blue: "electric blue",
  green: "mint green",
  yellow: "pale yellow",
};

const generate = async (
  image: File | null,
  colors: string[],
  prevState: any,
  // formData: FormData,
) => {
  // const lol = Object.fromEntries(formData);
  // console.log(lol);

  if (!image) {
    return false;
  }

  const prompt = colors.map((color) => promptColors[color]).join(", ");
  const formData = new FormData();
  formData.append("image", image);
  formData.append("prompt", prompt);

  try {
    const response = await fetch("http://127.0.0.1:8000/image", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      return { error: response.statusText };
    }

    const json = await response.json();

    return json;
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
};

export default generate;
