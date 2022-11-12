import { tableNames } from "lib";
import { browserSupabaseClient } from "pages/_app";

export const invoiceWithPartnerFetcher = async (
  _tableName: string,
  condition?: {
    partner_id: number;
  },
) => {
  const table = browserSupabaseClient.from(tableNames.invoice);

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
