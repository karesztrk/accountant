import { Invoice, PartnerName } from "types/database";
import { Invoice as ClientInvoice } from "types/client";

export const toInvoice = (invoice: Invoice): ClientInvoice => {
  return {
    ...invoice,
    issued_on: invoice?.issued_on ? new Date(invoice.issued_on) : new Date(),
    partner_id: String(invoice.partner_id),
  };
};

export const toPartners = (partners: PartnerName[]) => {
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
    paid,
  }: ClientInvoice,
  id?: number
): Invoice => ({
  id,
  invoice_number,
  amount,
  currency,
  issued_on: issued_on.toISOString(),
  partner_id: Number(partner_id),
  paid,
});
