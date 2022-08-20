import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { tableNames } from "lib";
import { InvoiceWithPartner } from "types/database";

export const invoiceWithPartnerFetcher = async (
  _tableName: string,
  condition?: {
    partner_id: number;
  }
) => {
  const table = supabaseClient.from<InvoiceWithPartner>(tableNames.invoice);

  let data = undefined;
  if (condition) {
    ({ data } = await table
      .select("*, partner!inner(name)")
      .eq("partner_id", condition.partner_id));
  } else {
    ({ data } = await table.select("*, partner!inner(name)"));
  }
  return data || [];
};
