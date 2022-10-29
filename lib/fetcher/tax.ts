import { tableNames } from "lib";
import { browserSupabaseClient } from "pages/_app";
import {
  Tax,
  TaxInsert,
  TaxmentWithTransactionInsert,
  TaxWithTransaction,
} from "types/database";

export const taxFetcher = async (_: string, condition: { id: number }) => {
  const { data } = await browserSupabaseClient
    .from(tableNames.tax)
    .select<string, TaxWithTransaction>("*, transaction!inner(*)")
    .eq("id", condition.id)
    .throwOnError()
    .single();
  return data || undefined;
};

export const taxesFetcher = async () => {
  const { data } = await browserSupabaseClient
    .from(tableNames.payment)
    .select<string, TaxWithTransaction>("*, transaction!inner(*)");
  return data || [];
};

export const taxMutationFetcher =
  (_: string) => async (values: TaxmentWithTransactionInsert) => {
    const { data: transaction } = await browserSupabaseClient
      .from(tableNames.transaction)
      .upsert(values.transaction)
      .select()
      .throwOnError()
      .single();

    if (!transaction) {
      throw Error(`Transaction ${values.id} not found during update`);
    }

    const { transaction: tx, ...taxValues } = values;

    const tax: TaxInsert = {
      ...taxValues,
      transaction_id: transaction.id,
    };

    const { data } = await browserSupabaseClient
      .from(tableNames.tax)
      .upsert(tax)
      .throwOnError()
      .single();

    return data || undefined;
  };
