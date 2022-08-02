import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { tableNames } from "lib";
import { singleFetcher } from "lib/fetcher";
import useSWR from "swr";
import { Partner } from "types/database";

export const usePartner = (id?: string, fallbackData?: Partner) => {
  const { user } = useUser();
  const key = user ? [id, tableNames.partner] : null;
  return useSWR<Partner | undefined, PostgrestError>(key, singleFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData,
  });
};
