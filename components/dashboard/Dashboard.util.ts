import { Income } from "types/database";

export const getRevenueValue = (revenue: Income[]) =>
  revenue[revenue.length - 1].amount;

export const getRevenueCurrency = (revenue: Income[]) =>
  revenue[revenue.length - 1].currency;

export const getRevenueDiff = (revenue: Income[]) =>
  (
    revenue[revenue.length - 1].amount / revenue[revenue.length - 2].amount
  ).toFixed(2);
