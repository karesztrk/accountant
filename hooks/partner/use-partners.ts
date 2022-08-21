import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys, tableNames } from "lib";
import { listFetcher } from "lib/fetcher";
import useSWR from "swr";
import { Partner } from "types/database";

export const usePartners = (fallbackData?: Partner[]) => {
  const key = cacheKeys.partners;
  return useSWR<Partner[], PostgrestError>(key, listFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData,
  });
};
