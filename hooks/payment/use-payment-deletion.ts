import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { tableNames } from "lib";

const fetcher = async (ids: number[]) => {
  const { data } = await supabaseClient
    .from(tableNames.payment)
    .delete()
    .in("id", ids)
    .throwOnError();
  return data || undefined;
};

export const usePaymentDeletion = () => {
  return {
    trigger: fetcher,
  };
};
