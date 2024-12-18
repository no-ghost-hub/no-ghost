const formatDecimalTime = (time: number) => {
  const hours = Math.floor(time);
  const minutes = Math.round((time - hours) * 60);
  const formatted = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  return formatted;
};

export default formatDecimalTime;
