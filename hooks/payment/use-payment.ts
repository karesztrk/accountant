import { useUser } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys, tableNames } from "lib";
import { singleFetcher } from "lib/fetcher";
import useSWR from "swr";
import { Payment } from "types/database";

export const usePayment = (id?: string, fallbackData?: Payment) => {
  const { user } = useUser();
  const key = user ? cacheKeys.payment(id) : null;
  return useSWR<Payment | undefined, PostgrestError>(key, singleFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData,
  });
};
