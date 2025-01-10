export const isSlotAvailable = (
  guests: number,
  date: string,
  time: { from: string; to: string },
  maxCapacity: number,
  reservations?: any[],
) => {
  const slotStart = new Date(`${date}T${time.from}:00`);
  const slotEnd = new Date(`${date}T${time.to}:00`);

  const overlapping = reservations?.filter((r) => {
    const reservationStart = new Date(r.from);
    const reservationEnd = new Date(r.to);

    const isSameDay =
      slotStart.toDateString() === reservationStart.toDateString();

    return (
      isSameDay && slotStart < reservationEnd && slotEnd > reservationStart
    );
  });

  const reservedCapacity = overlapping?.reduce((acc, r) => acc + r.capacity, 0);

  return reservedCapacity + guests <= maxCapacity;
};
