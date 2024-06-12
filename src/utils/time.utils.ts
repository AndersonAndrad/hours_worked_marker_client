/**
 * Format the result as "dd:hh:mm:ss"
 * @param hours
 */
export const formatHoursToDDHHMMSS = (hours: number): string => {
  const totalSeconds = Math.floor(hours * 3600);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const remainingSeconds = totalSeconds % (24 * 3600);
  const hoursInDay = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  return `${String(days).padStart(2, '0')}:${String(hoursInDay).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const parseDDHHMMSSToHours = (duration: string): string => {
  const [days, hours, minutes, seconds] = duration.split(':');

  const totalHours = Number(days) * 24 + Number(hours) + Number(minutes) / 60 + Number(seconds) / 3600;

  return totalHours.toFixed(2);
};
