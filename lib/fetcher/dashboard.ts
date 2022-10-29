import { viewNames } from "lib";
import { browserSupabaseClient } from "pages/_app";

export const dashboardFetcher = async () => {
  const { data: income } = await browserSupabaseClient
    .from(viewNames.income)
    .select("*");

  const { data: expense } = await browserSupabaseClient
    .from(viewNames.income)
    .select("*");
  return {
    income: income || [],
    expense: expense || [],
  };
};
