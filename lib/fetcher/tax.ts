import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { tableNames } from "lib";
import { Tax, Transaction } from "types/database";

export const taxFetcher = async (_: string, condition: { id: number }) => {
  const { data } = await supabaseClient
    .from<Tax>(tableNames.tax)
    .select("*, transaction!inner(*)")
    .eq("id", condition.id)
    .throwOnError()
    .single();
  return data || undefined;
};

export const taxesFetcher = async () => {
  const { data } = await supabaseClient
    .from<Tax>(tableNames.payment)
    .select("*, transaction!inner(*)");
  return data || [];
};

export const taxMutationFetcher = (_: string) => async (values: Tax) => {
  const { data: transaction } = await supabaseClient
    .from<Transaction>(tableNames.transaction)
    .upsert(values.transaction)
    .throwOnError()
    .single();

  const tax: Partial<Tax> = {
    ...values,
    transaction_id: transaction?.id,
  };
  delete tax.transaction;

  const { data } = await supabaseClient
    .from<Transaction>(tableNames.tax)
    .upsert(tax)
    .throwOnError()
    .single();

  return data || undefined;
};
