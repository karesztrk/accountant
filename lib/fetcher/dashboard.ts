import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { viewNames } from "lib";
import { Income } from "types/database";

export const dashboardFetcher = async () => {
  const { data } = await supabaseClient
    .from<Income>(viewNames.revenue)
    .select("*");
  return data || [];
};
