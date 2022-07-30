import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys, tableNames } from "lib";
import useSWR from "swr";
import { Partner } from "types/database";

const fetcher = async () => {
  const { data, error } = await supabaseClient
    .from<Partner>(tableNames.partner)
    .throwOnError()
    .select();
  return data || [];
};

export const usePartners = (fallbackData?: Partner[]) => {
  return useSWR<Partner[], PostgrestError>(cacheKeys.partners, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData,
  });
};
