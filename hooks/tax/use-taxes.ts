import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys } from "lib";
import { taxesFetcher } from "lib/fetcher/tax";
import useSWR from "swr";
import { Tax } from "types/database";

export const useTaxes = () => {
  const key = cacheKeys.taxes;
  return useSWR<Tax[], PostgrestError>(key, taxesFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
