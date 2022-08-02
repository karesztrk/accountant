import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Base } from "types/database";

export const singleFetcher = async <T extends Base>(
  id: T[keyof T],
  table: string
) => {
  const { data } = await supabaseClient
    .from<T>(table)
    .select()
    .eq("id", id)
    .throwOnError()
    .single();
  return data || undefined;
};
