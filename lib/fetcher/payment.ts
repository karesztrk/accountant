import { tableNames } from "lib";
import { browserSupabaseClient } from "pages/_app";
import {
  PaymentInsert,
  PaymentWithTransaction,
  PaymentWithTransactionInsert,
} from "types/database";

export const paymentFetcher = async (_: string, condition: { id: number }) => {
  const { data } = await browserSupabaseClient
    .from(tableNames.payment)
    .select<string, PaymentWithTransaction>("*, transaction!inner(*)")
    .eq("id", condition.id)
    .throwOnError()
    .single();
  return data || undefined;
};

export const paymentsFetcher = async () => {
  const { data } = await browserSupabaseClient
    .from(tableNames.payment)
    .select<string, PaymentWithTransaction>("*, transaction!inner(*)");
  return data || [];
};

export const paymentMutationFetcher =
  (_: string) => async (values: PaymentWithTransactionInsert) => {
    const { data: transaction } = await browserSupabaseClient
      .from(tableNames.transaction)
      .upsert(values.transaction)
      .select()
      .throwOnError()
      .single();

    if (!transaction) {
      throw Error(`Transaction ${values.id} not found during update`);
    }

    const { transaction: tx, ...paymentValues } = values;

    const payment: PaymentInsert = {
      ...paymentValues,
      transaction_id: transaction.id,
    };

    const { data } = await browserSupabaseClient
      .from(tableNames.payment)
      .upsert(payment)
      .throwOnError()
      .single();

    return data || undefined;
  };
