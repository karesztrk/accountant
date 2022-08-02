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

export const listFetcher = async <T extends Base>(table: string) => {
  const { data } = await supabaseClient.from<T>(table).throwOnError().select();
  return data || [];
};

export const deletionFetcher =
  (table: string) =>
  async <T extends Base>(ids: T[keyof T][]) => {
    const { data } = await supabaseClient
      .from<T>(table)
      .delete()
      .in("id", ids)
      .throwOnError();

    return data || undefined;
  };

export const mutationFetcher =
  (table: string) =>
  async <T extends Base>(values: T) => {
    const { data } = await supabaseClient
      .from<T>(table)
      .upsert(values)
      .throwOnError()
      .single();
    return data || undefined;
  };
