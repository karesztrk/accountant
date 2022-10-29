import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys } from "lib";
import { taxFetcher } from "lib/fetcher/tax";
import useSWR from "swr";
import { TaxWithTransaction } from "types/database";

export const useTax = (id?: string) => {
  const key = cacheKeys.tax(id);
  return useSWR<TaxWithTransaction | undefined, PostgrestError>(
    key,
    taxFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};
