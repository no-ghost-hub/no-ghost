export default (ms: number = 200) =>
  new Promise((resolve) => setTimeout(resolve, ms));
