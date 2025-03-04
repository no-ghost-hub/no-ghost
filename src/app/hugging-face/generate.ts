"use server";

import {
  AutoModelForCausalLM,
  AutoTokenizer,
  Tensor,
} from "@huggingface/transformers";

const generate = async (prevState: any, formData: FormData) => {
  const { prompt } = Object.fromEntries(formData);

  const chat = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: prompt as string },
  ];

  let modelId = "HuggingFaceTB/SmolLM2-1.7B-Instruct";
  // modelId = "onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX";
  // modelId = "onnx-community/Qwen2.5-0.5B-Instruct";
  // modelId = "onnx-community/Llama-3.2-1B-Instruct";

  const model = await AutoModelForCausalLM.from_pretrained(modelId, {
    dtype: "fp16",
  });

  const tokenizer = await AutoTokenizer.from_pretrained(modelId);
  const formattedChat = tokenizer.apply_chat_template(chat, {
    tokenize: false,
    add_generation_prompt: true,
  });

  const input = tokenizer(formattedChat, {
    return_tensors: "pt",
    add_special_tokens: false,
  });

  const output = (await model.generate({
    ...input,
    // max_new_tokens: 128,
  })) as Tensor;

  const result = tokenizer.decode(output);

  return result;
};

export default generate;
