export const utcDate = (dateString: string, timeZone?: string) => {
  const offsetFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
  });
  const offsetString = offsetFormatter.format(new Date());
  const offset = offsetString.split("GMT")[1];

  const date = new Date(`${dateString}${offset}`);

  return date.toISOString().replace("T", " ").slice(0, -5);
};
