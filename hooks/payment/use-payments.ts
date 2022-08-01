import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys, tableNames } from "lib";
import useSWR from "swr";
import { Payment } from "types/database";

const fetcher = async () => {
  const { data } = await supabaseClient
    .from<Payment>(tableNames.payment)
    .throwOnError()
    .select();
  return data || [];
};

export const usePayments = (fallbackData?: Payment[]) => {
  return useSWR<Payment[], PostgrestError>(cacheKeys.payment, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData,
  });
};
