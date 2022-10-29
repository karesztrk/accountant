import { browserSupabaseClient } from "pages/_app";
import { Base, Tables, Upsert } from "types/database";

export const singleFetcher = async <T extends Base>(
  table: Tables,
  condition: { id: T[keyof T] }
) => {
  const { data } = await browserSupabaseClient
    .from(table)
    .select("*")
    .eq("id", condition.id)
    .throwOnError()
    .single();
  return data || undefined;
};

export const listFetcher = async (table: Tables) => {
  const { data } = await browserSupabaseClient
    .from(table)
    .select()
    .throwOnError();
  return data || [];
};

export const deletionFetcher =
  (table: Tables) =>
  async <T extends Base>(ids: T[keyof T][]) => {
    const { data } = await browserSupabaseClient
      .from(table)
      .delete()
      .in("id", ids)
      .throwOnError();

    return data || undefined;
  };

export const mutationFetcher = (table: Tables) => async (values: Upsert) => {
  const { data } = await browserSupabaseClient
    .from(table)
    .upsert(values)
    .throwOnError()
    .single();
  return data || undefined;
};
