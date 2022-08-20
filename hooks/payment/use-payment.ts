import { useUser } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys } from "lib";
import { paymentFetcher } from "lib/fetcher/payment";
import useSWR from "swr";
import { Payment } from "types/database";

export const usePayment = (id?: string, fallbackData?: Payment) => {
  const { user } = useUser();
  const key = user ? cacheKeys.payment(id) : null;
  return useSWR<Payment | undefined, PostgrestError>(key, paymentFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData,
  });
};
