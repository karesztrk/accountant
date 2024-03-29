import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys } from "lib";
import { invoiceWithPartnerFetcher } from "lib/fetcher/invoice";
import useSWR, { BareFetcher } from "swr";
import { InvoiceWithPartner } from "types/database";

export const useInvoices = (condition?: { partner_id: string }) => {
  const key = cacheKeys.invoices(condition);
  return useSWR<InvoiceWithPartner[], PostgrestError>(
    key,
    invoiceWithPartnerFetcher as BareFetcher<InvoiceWithPartner[]>,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};
