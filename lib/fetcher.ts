import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { tableNames } from "lib";
import { Base, InvoiceWithPartner, PaymentWithInvoice } from "types/database";

export const singleFetcher = async <T extends Base>(
  table: string,
  condition: { id: T[keyof T] }
) => {
  const { data } = await supabaseClient
    .from<T>(table)
    .select()
    .eq("id", condition.id)
    .throwOnError()
    .single();
  return data || undefined;
};

export const listFetcher = async <T extends Base>(table: string) => {
  const { data } = await supabaseClient.from<T>(table).throwOnError().select();
  return data || [];
};

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

export const paymentWithInvoiceFetcher = async () => {
  const { data } = await supabaseClient
    .from<PaymentWithInvoice>(tableNames.invoice)
    .select("*, invoice!inner(invoice_number)");
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
