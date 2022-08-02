import { useUser } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { tableNames } from "lib";
import { listFetcher } from "lib/fetcher";
import useSWR from "swr";
import { Partner } from "types/database";

export const usePartners = (fallbackData?: Partner[]) => {
  const { user } = useUser();
  const key = user ? tableNames.partner : null;
  return useSWR<Partner[], PostgrestError>(key, listFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData,
  });
};
