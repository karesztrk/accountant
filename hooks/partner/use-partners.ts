import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys } from "lib";
import { listFetcher } from "lib/fetcher";
import useSWR, { BareFetcher } from "swr";
import { Partner } from "types/database";

export const usePartners = (fallbackData?: Partner[]) => {
  const key = cacheKeys.partners;
  return useSWR<Partner[], PostgrestError>(
    key,
    listFetcher as BareFetcher<Partner[]>,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      fallbackData,
    },
  );
};
