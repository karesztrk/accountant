import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys } from "lib";
import { paymentsFetcher } from "lib/fetcher/payment";
import useSWR from "swr";
import { Payment } from "types/database";

export const usePayments = () => {
  const key = cacheKeys.payments;
  return useSWR<Payment[], PostgrestError>(key, paymentsFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
