import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { tableNames } from "lib";
import { Partner } from "types/database";

const fetcher = async (partner: Partner) => {
  const { data } = await supabaseClient
    .from<Partner>(tableNames.partner)
    .upsert(partner)
    .throwOnError()
    .single();
  return data || undefined;
};

export const usePartnerMutation = () => {
  return {
    trigger: fetcher,
  };
};
