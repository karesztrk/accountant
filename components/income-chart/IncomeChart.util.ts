import { BarDatum } from "@nivo/bar";
import { Expense, Income } from "types/database";

export const toChartData = (data: { income: Income[]; expense: Expense[] }) => {
  if (!data) {
    return [];
  }
  const datum = new Map<string, BarDatum>(
    data.income.map(({ period, local_amount }) => [
      period,
      {
        period,
        income: local_amount,
        expense: 0,
        total: local_amount,
      },
    ])
  );

  data.expense.forEach(({ period, amount }) => {
    const entry = datum.get(period);
    if (entry) {
      datum.set(period, {
        ...entry,
        income: (entry.income as number) + amount,
        expense: amount * -1,
      });
    } else {
      datum.set(period, {
        period: period,
        income: 0,
        expense: amount * -1,
      });
    }
  });

  return Array.from(datum.values()).sort((a, b) =>
    (a.period as string).localeCompare(b.period as string)
  );
};

export const getCurrency = (data: { income: Income[]; expense: Expense[] }) =>
  data.income[0].local_currency;
