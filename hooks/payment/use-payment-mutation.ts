import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { tableNames } from "lib";
import { Payment } from "types/database";

const fetcher = async (payment: Payment) => {
  const { data } = await supabaseClient
    .from<Payment>(tableNames.payment)
    .upsert(payment)
    .throwOnError()
    .single();
  return data || undefined;
};

export const usePaymentMutation = () => {
  return {
    trigger: fetcher,
  };
};
