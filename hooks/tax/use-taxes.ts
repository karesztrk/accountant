import { useUser } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { tableNames } from "lib";
import { taxesFetcher } from "lib/fetcher/tax";
import useSWR from "swr";
import { Tax } from "types/database";

export const useTaxes = (fallbackData?: Tax[]) => {
  const { user } = useUser();
  const key = user ? tableNames.tax : null;
  return useSWR<Tax[], PostgrestError>(key, taxesFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData,
  });
};
