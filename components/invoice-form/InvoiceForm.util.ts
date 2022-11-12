import { Invoice, Partner, InvoiceInsert } from "types/database";
import { Invoice as ClientInvoice } from "types/client";

export const toInvoice = (invoice: Invoice): ClientInvoice => {
  return {
    ...invoice,
    amount: invoice.amount,
    currency: invoice.currency,
    invoice_number: invoice.invoice_number,
    url: invoice.url || undefined,
    issued_on: invoice?.issued_on ? new Date(invoice.issued_on) : new Date(),
    partner_id: String(invoice.partner_id),
  };
};

export const toPartners = (partners: Partner[]) => {
  return partners.map((partner) => ({
    label: partner.name,
    value: String(partner.id),
  }));
};

export const toRemoteInvoice = (
  {
    invoice_number,
    amount,
    currency,
    issued_on,
    partner_id,
    url,
  }: ClientInvoice,
  id?: number,
): InvoiceInsert => ({
  id,
  invoice_number,
  amount,
  currency,
  issued_on: `${issued_on.getFullYear()}-${String(
    issued_on.getMonth() + 1,
  ).padStart(2, "0")}-${String(issued_on.getDate()).padStart(2, "0")}`,
  partner_id: Number(partner_id),
  url: url || null,
});
