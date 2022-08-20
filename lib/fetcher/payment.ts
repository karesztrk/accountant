import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { tableNames } from "lib";
import { Payment, Transaction } from "types/database";

export const paymentFetcher = async (_: string, condition: { id: number }) => {
  const { data } = await supabaseClient
    .from<Payment>(tableNames.payment)
    .select("*, transaction!inner(*)")
    .eq("id", condition.id)
    .throwOnError()
    .single();
  return data || undefined;
};

export const paymentsFetcher = async () => {
  const { data } = await supabaseClient
    .from<Payment>(tableNames.payment)
    .select("*, transaction!inner(*)");
  return data || [];
};

export const paymentMutationFetcher =
  (_: string) => async (values: Payment) => {
    const { data: transaction } = await supabaseClient
      .from<Transaction>(tableNames.transaction)
      .upsert(values.transaction)
      .throwOnError()
      .single();

    const payment: Partial<Payment> = {
      ...values,
      transaction_id: transaction?.id,
    };
    delete payment.transaction;

    const { data } = await supabaseClient
      .from<Transaction>(tableNames.payment)
      .upsert(payment)
      .throwOnError()
      .single();

    return data || undefined;
  };
