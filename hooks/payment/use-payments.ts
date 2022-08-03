import { useUser } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { tableNames } from "lib";
import { paymentWithInvoiceFetcher } from "lib/fetcher";
import useSWR from "swr";
import { PaymentWithInvoice } from "types/database";

export const usePayments = (fallbackData?: PaymentWithInvoice[]) => {
  const { user } = useUser();
  const key = user ? tableNames.payment : null;
  return useSWR<PaymentWithInvoice[], PostgrestError>(
    key,
    paymentWithInvoiceFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      fallbackData,
    }
  );
};
