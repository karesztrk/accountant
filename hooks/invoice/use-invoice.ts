import { useUser } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { tableNames } from "lib";
import { singleFetcher } from "lib/fetcher";
import useSWR from "swr";
import { Invoice } from "types/database";

export const useInvoice = (id?: string, fallbackData?: Invoice) => {
  const { user } = useUser();
  const key = user ? [id, tableNames.invoice] : null;
  return useSWR<Invoice | undefined, PostgrestError>(key, singleFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData,
  });
};
