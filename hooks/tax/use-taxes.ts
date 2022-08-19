import { useUser } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { tableNames } from "lib";
import { taxFetcher } from "lib/fetcher";
import useSWR from "swr";
import { Tax } from "types/database";

export const useTaxes = (fallbackData?: Tax[]) => {
  const { user } = useUser();
  const key = user ? tableNames.tax : null;
  return useSWR<Tax[], PostgrestError>(key, taxFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData,
  });
};
