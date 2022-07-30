import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { tableNames } from "lib";
import { Partner } from "types/database";

const fetcher = async (ids: number[]) => {
  const { data } = await supabaseClient
    .from(tableNames.partner)
    .delete()
    .in("id", ids)
    .throwOnError();
  console.log(
    "🚀 ~ file: use-partner-deletion.ts ~ line 15 ~ fetcher ~ data",
    data
  );
  return data || undefined;
};

export const usePartnerDeletion = () => {
  return {
    trigger: fetcher,
  };
};
