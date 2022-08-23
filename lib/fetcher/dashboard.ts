import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { viewNames } from "lib";
import { Income } from "types/database";

export const dashboardFetcher = async () => {
  const { data: income } = await supabaseClient
    .from<Income>(viewNames.income)
    .select("*");

  const { data: expense } = await supabaseClient
    .from<Income>(viewNames.income)
    .select("*");
  return {
    income: income || [],
    expense: expense || [],
  };
};
