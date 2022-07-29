import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { tableNames } from "lib";
import { Partner } from "types/database";

const fetcher = async (id?: string, partner?: Partial<Partner>) => {
  if (!partner) {
    return undefined;
  }

  const table = supabaseClient.from<Partner>(tableNames.partner);

  if (!id) {
    return await table.insert(partner).throwOnError().single();
  }

  const { data } = await table
    .update(partner)
    .eq("id", id)
    .throwOnError()
    .single();
  return data || undefined;
};

export const usePartnerMutation = () => {
  return {
    trigger: fetcher,
  };
};
