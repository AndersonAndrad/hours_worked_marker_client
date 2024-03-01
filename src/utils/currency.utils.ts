export const convertCentsToMoney = (cents: number): number => cents;

export const maskMoney = (currency: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(currency);
};
