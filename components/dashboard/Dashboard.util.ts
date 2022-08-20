import { Income } from "types/database";

export const getRevenueValue = (revenue: Income[]) =>
  revenue.length > 0 ? revenue[revenue.length - 1].amount : 0;

export const getRevenueCurrency = (revenue: Income[]) =>
  revenue.length > 0 ? revenue[revenue.length - 1].currency : 0;

export const getRevenueDiff = (revenue: Income[]) =>
  revenue.length > 0
    ? (
        revenue[revenue.length - 1].amount / revenue[revenue.length - 2].amount
      ).toFixed(2)
    : 0;
