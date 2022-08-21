import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys } from "lib";
import { paymentFetcher } from "lib/fetcher/payment";
import useSWR from "swr";
import { Payment } from "types/database";

export const usePayment = (id?: string, fallbackData?: Payment) => {
  const key = cacheKeys.payment(id);
  return useSWR<Payment | undefined, PostgrestError>(key, paymentFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData,
  });
};
