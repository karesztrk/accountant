import { Revenue } from "types/database";

export const getRevenueValue = (revenue: Revenue[]) =>
  revenue[revenue.length - 1].sum;

export const getRevenueCurrency = (revenue: Revenue[]) =>
  revenue[revenue.length - 1].currency;

export const getRevenueDiff = (revenue: Revenue[]) =>
  (revenue[revenue.length - 1].sum / revenue[revenue.length - 2].sum).toFixed(
    2
  );
