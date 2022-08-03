import { useUser } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { tableNames } from "lib";
import { invoiceWithPartnerFetcher } from "lib/fetcher";
import useSWR from "swr";
import { InvoiceWithPartner } from "types/database";

export const useInvoices = (fallbackData?: InvoiceWithPartner[]) => {
  const { user } = useUser();
  const key = user ? tableNames.invoice : null;
  return useSWR<InvoiceWithPartner[], PostgrestError>(
    key,
    invoiceWithPartnerFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      fallbackData,
    }
  );
};
