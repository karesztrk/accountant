import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { tableNames } from "lib";
import { Invoice } from "types/database";

const fetcher = async (invoice: Partial<Invoice>) => {
  const { data } = await supabaseClient
    .from<Invoice>(tableNames.invoice)
    .upsert(invoice)
    .throwOnError()
    .single();
  return data || undefined;
};

export const useInvoiceMutation = () => {
  return {
    trigger: fetcher,
  };
};
