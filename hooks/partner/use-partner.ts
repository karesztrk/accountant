import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys, tableNames } from "lib";
import useSWR from "swr";
import { Partner } from "types/database";

const fetcher = async (key: string) => {
  const [_, id] = key.split("/");
  const { data } = await supabaseClient
    .from<Partner>(tableNames.partner)
    .select()
    .eq("id", id)
    .throwOnError()
    .single();
  return data || undefined;
};

export const usePartner = (id?: string, fallbackData?: Partner) => {
  const key = id ? cacheKeys.partner(id) : null;
  return useSWR<Partner | undefined, PostgrestError>(key, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData,
  });
};
