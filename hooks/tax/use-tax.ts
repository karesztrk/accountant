import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys } from "lib";
import { singleFetcher } from "lib/fetcher";
import useSWR from "swr";
import { Tax } from "types/database";

export const useTax = (id?: string) => {
  const key = cacheKeys.tax(id);
  return useSWR<Tax | undefined, PostgrestError>(key, singleFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
