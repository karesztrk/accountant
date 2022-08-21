import { Income } from "types/database";

export const getRevenueValue = (revenue: Income[]) =>
  revenue.length > 0 ? revenue[0].amount : 0;

export const getRevenueCurrency = (revenue: Income[]) =>
  revenue.length > 0 ? revenue[0].currency : 0;

export const getRevenueDiff = (revenue: Income[]) =>
  revenue.length > 0 ? (revenue[0].amount / revenue[1].amount).toFixed(2) : 0;
