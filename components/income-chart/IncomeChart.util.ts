import { BarDatum } from "@nivo/bar";
import { Expense, Income } from "types/database";

export const toChartData = (data: { income: Income[]; expense: Expense[] }) => {
  if (!data) {
    return [];
  }
  const datum = new Map<string, BarDatum>(
    data.income.map(({ period = "", local_amount = "" }) => {
      const key = period || "";
      const income = local_amount || 0;
      const expense = 0;
      const total = local_amount || 0;
      return [
        key,
        {
          period: key,
          income,
          expense,
          total,
        },
      ];
    }),
  );

  data.expense.forEach(({ period = "", amount = 0 }) => {
    const key = period || "";
    const amt = amount || 0;
    const entry = datum.get(key);
    if (entry) {
      datum.set(key, {
        ...entry,
        income: (entry.income as number) + amt,
        expense: amt * -1,
      });
    } else {
      datum.set(key, {
        period: key,
        income: 0,
        expense: amt * -1,
      });
    }
  });

  return Array.from(datum.values()).sort((a, b) =>
    (a.period as string).localeCompare(b.period as string),
  );
};

export const getCurrency = (data: { income: Income[]; expense: Expense[] }) =>
  data.income[0].local_currency;
