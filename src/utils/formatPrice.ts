const util = (amount: number, currency: string = "EUR") =>
  new Intl.NumberFormat("en-BE", {
    style: "currency",
    currency,
    maximumFractionDigits: 1,
    trailingZeroDisplay: "stripIfInteger",
  }).format(amount);

export default util;
