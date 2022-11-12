import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys } from "lib";
import { singleFetcher } from "lib/fetcher";
import useSWR, { BareFetcher } from "swr";
import { Partner } from "types/database";

export const usePartner = (id?: string) => {
  const key = cacheKeys.partner(id);
  return useSWR<Partner | undefined, PostgrestError>(
    key,
    singleFetcher as BareFetcher<Partner | undefined>,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
};
