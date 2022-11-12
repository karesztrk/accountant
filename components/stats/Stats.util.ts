import { Expense, Income } from "types/database";

export const getRevenue = (income: Income[], locale?: string) => {
  const amount =
    income.length > 0 && income[0].local_amount ? income[0].local_amount : 0;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: income[0].local_currency || undefined,
    currencyDisplay: "narrowSymbol",
  }).format(amount);
};

export const getRevenueDiff = (income: Income[]) =>
  income.length > 1 && income[0].local_amount && income[1].local_amount
    ? ((income[0].local_amount / income[1].local_amount) * 100 - 100).toFixed(2)
    : 0;

export const getProfit = (
  income: Income[],
  expense: Expense[],
  locale?: string,
) => {
  const amount =
    income.length > 0 &&
    expense.length > 0 &&
    income[0].local_amount &&
    expense[0].amount
      ? income[0].local_amount + expense[0].amount
      : 0;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: income[0].local_currency || undefined,
    currencyDisplay: "narrowSymbol",
  }).format(amount);
};

export const getProfitDiff = (income: Income[], expense: Expense[]) =>
  income.length > 1 &&
  expense.length > 1 &&
  income[0].local_amount &&
  expense[0].amount &&
  income[1].local_amount &&
  expense[1].amount
    ? (
        ((income[0].local_amount + expense[0].amount) /
          (income[1].local_amount + expense[1].amount)) *
          100 -
        100
      ).toFixed(2)
    : 0;
