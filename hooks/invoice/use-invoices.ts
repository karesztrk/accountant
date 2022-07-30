import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys, tableNames } from "lib";
import useSWR from "swr";
import { InvoiceWithPartner } from "types/database";

const fetcher = async () => {
  const { data } = await supabaseClient
    .from<InvoiceWithPartner>(tableNames.invoice)
    .throwOnError()
    .select(`*, partner!inner(name)`);
  return data || [];
};

export const useInvoices = (fallbackData?: InvoiceWithPartner[]) => {
  return useSWR<InvoiceWithPartner[], PostgrestError>(
    cacheKeys.invoices,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      fallbackData,
    }
  );
};
