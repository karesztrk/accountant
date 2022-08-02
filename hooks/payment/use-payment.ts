import { useUser } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { tableNames } from "lib";
import { singleFetcher } from "lib/fetcher";
import useSWR from "swr";
import { Payment } from "types/database";

export const usePayment = (id?: string, fallbackData?: Payment) => {
  const { user } = useUser();
  const key = user ? [id, tableNames.payment] : null;
  return useSWR<Payment | undefined, PostgrestError>(key, singleFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData,
  });
};
