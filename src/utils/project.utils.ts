import { getFirstAndLastDayOfCurrentMonth } from './date.utils';

interface CalculateExpectedHours {
  expectedHoursPerDay: number;
  daysToCalculate?: number;
  fullMonth?: boolean;
}

export const CalcuateExpectedHoursToWork = (props: CalculateExpectedHours): number => {
  if (props?.fullMonth) {
    const { lastDate } = getFirstAndLastDayOfCurrentMonth();
    return lastDate.getDate() * props.expectedHoursPerDay;
  } else {
    return (props?.daysToCalculate ?? 0) * props.expectedHoursPerDay;
  }
};
export const calculateMoneyEarned = (totalWorkedTimeMillis: number, hourlyRate: number): number => {
  const totalWorkedTimeMinutes = totalWorkedTimeMillis / (1000 * 60);
  return (totalWorkedTimeMinutes * hourlyRate) / 60;
};

export const calculateEstimatedEarned = (hoursExpected: number, pricePerHours: number) => {
  const money = hoursExpected * pricePerHours;
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(money);
};
