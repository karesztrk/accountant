import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { tableNames } from "lib";

const fetcher = async (ids: number[]) => {
  const { data } = await supabaseClient
    .from(tableNames.invoice)
    .delete()
    .in("id", ids)
    .throwOnError();

  return data || undefined;
};

export const useInvoiceDeletion = () => {
  return {
    trigger: fetcher,
  };
};
