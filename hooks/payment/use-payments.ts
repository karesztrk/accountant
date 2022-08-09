import { useUser } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { tableNames } from "lib";
import { paymentFetcher } from "lib/fetcher";
import useSWR from "swr";
import { Payment } from "types/database";

export const usePayments = (fallbackData?: Payment[]) => {
  const { user } = useUser();
  const key = user ? tableNames.payment : null;
  return useSWR<Payment[], PostgrestError>(key, paymentFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData,
  });
};
