import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys } from "lib";
import { paymentFetcher } from "lib/fetcher/payment";
import useSWR from "swr";
import { PaymentWithTransaction } from "types/database";

export const usePayment = (id?: string) => {
  const key = cacheKeys.payment(id);
  return useSWR<PaymentWithTransaction | undefined, PostgrestError>(
    key,
    paymentFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};
