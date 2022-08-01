import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { tableNames } from "lib";

const fetcher = async (ids: number[]) => {
  const { data } = await supabaseClient
    .from(tableNames.partner)
    .delete()
    .in("id", ids)
    .throwOnError();
  return data || undefined;
};

export const usePartnerDeletion = () => {
  return {
    trigger: fetcher,
  };
};
