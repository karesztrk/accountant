import { Expense, Income } from "types/database";

export const getRevenueValue = (income: Income[]) =>
  income.length > 0 ? income[0].local_amount : 0;

export const getRevenueCurrency = (income: Income[]) =>
  income.length > 0 ? income[0].local_currency : "";

export const getRevenueDiff = (income: Income[]) =>
  income.length > 1
    ? ((income[0].local_amount / income[1].local_amount) * 100 - 100).toFixed(2)
    : 0;

export const getProfitValue = (income: Income[], expense: Expense[]) =>
  income.length > 0 && expense.length > 0
    ? income[0].local_amount + expense[0].amount
    : 0;

export const getProfitCurrency = (expense: Expense[]) =>
  expense.length > 0 ? expense[0].currency : "";

export const getProfitDiff = (income: Income[], expense: Expense[]) =>
  income.length > 1 && expense.length > 1
    ? (
        ((income[0].local_amount + expense[0].amount) /
          (income[1].local_amount + expense[1].amount)) *
          100 -
        100
      ).toFixed(2)
    : 0;
