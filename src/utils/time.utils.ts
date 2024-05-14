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
  const parts = duration.split(':');
  const days = parseInt(parts[0], 10);
  const hours = parseInt(parts[1], 10);
  const minutes = parseInt(parts[2], 10);
  const seconds = parseInt(parts[3], 10);

  const totalHours = days * 24 + hours + minutes / 60 + seconds / 3600;

  return totalHours.toFixed(2);
};
