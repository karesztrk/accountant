import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys } from "lib";
import { singleFetcher } from "lib/fetcher";
import useSWR from "swr";
import { Invoice } from "types/database";

export const useInvoice = (id?: string) => {
  const key = id ? cacheKeys.invoice(id) : null;
  return useSWR<Invoice | undefined, PostgrestError>(key, singleFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
