import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { cacheKeys, tableNames } from "lib";
import useSWR from "swr";
import { Invoice } from "types/database";

const fetcher = async () => {
  const { data } = await supabaseClient
    .from<Invoice>(tableNames.invoice)
    .throwOnError()
    .select();
  return data;
};

export const useInvoices = () => {
  return useSWR(cacheKeys.invoices, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
