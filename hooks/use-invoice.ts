import { supabaseClient } from "@supabase/auth-helpers-nextjs";
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
  return data;
};

export const useInvoice = (id?: string) => {
  const key = id ? cacheKeys.invoice(id) : null;
  console.log("🚀 ~ file: use-invoice.ts ~ line 22 ~ useInvoice ~ key", key);
  return useSWR(key, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
