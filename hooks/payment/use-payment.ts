import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys, tableNames } from "lib";
import useSWR from "swr";
import { Payment } from "types/database";

const fetcher = async (key: string) => {
  const [_, id] = key.split("/");
  const { data } = await supabaseClient
    .from<Payment>(tableNames.payment)
    .select()
    .eq("id", id)
    .throwOnError()
    .single();
  return data || undefined;
};

export const usePayment = (id?: string, fallbackData?: Payment) => {
  const key = id ? cacheKeys.payment(id) : null;
  return useSWR<Payment | undefined, PostgrestError>(key, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData,
  });
};
