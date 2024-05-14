export const getFirstAndLastDayOfCurrentMonth = (): { firstDate: Date; lastDate: Date } => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);

  return {
    firstDate,
    lastDate,
  };
};
