import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys, tableNames } from "lib";
import useSWR from "swr";
import { Invoice } from "types/database";

const fetcher = async (key: string) => {
  const [_, id] = key.split("/");
  const { data } = await supabaseClient
    .from<Invoice>(tableNames.invoice)
    .select()
    .eq("id", id)
    .throwOnError()
    .single();
  return data || undefined;
};

export const useInvoice = (id?: string, fallbackData?: Invoice) => {
  const key = id ? cacheKeys.invoice(id) : null;
  return useSWR<Invoice | undefined, PostgrestError>(key, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData,
  });
};
