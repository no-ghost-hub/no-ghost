const util = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-BE", {
    style: "currency",
    currency,
  }).format(amount);

export default util;
