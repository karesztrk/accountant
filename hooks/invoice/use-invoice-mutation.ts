import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { tableNames } from "lib";
import { Invoice } from "types/database";

const fetcher = async (id?: string, invoice?: Partial<Invoice>) => {
  if (!invoice) {
    return undefined;
  }

  const table = supabaseClient.from<Invoice>(tableNames.invoice);

  if (!id) {
    return await table.insert(invoice).throwOnError().single();
  }

  const { data } = await table
    .update(invoice)
    .eq("id", id)
    .throwOnError()
    .single();
  return data || undefined;
};

export const useInvoiceMutation = () => {
  return {
    trigger: fetcher,
  };
};
