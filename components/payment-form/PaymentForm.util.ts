import { InvoiceWithPartner, Partner, Payment } from "types/database";
import { Payment as ClientPayment } from "types/client";

export const toPayment = (payment: Payment): ClientPayment => {
  return {
    received_on: payment?.transaction.transaction_date
      ? new Date(payment.transaction.transaction_date)
      : new Date(),
    invoice_id: String(payment.invoice_id),
    partner_id: String(payment.partner_id),
    amount: payment.transaction.amount,
    currency: payment.transaction.currency,
    type: payment.type,
    local_amount: payment.local_amount,
    local_currency: payment.local_currency,
  };
};

export const toInvoiceOptions = (invoices: InvoiceWithPartner[]) => {
  return invoices.map((invoice) => ({
    label: `${invoice.invoice_number}`,
    description: `${invoice.amount} ${invoice.currency}`,
    value: invoice.id?.toString() || "",
    group: invoice.partner.name,
  }));
};

export const toPartnerOptions = (partners: Partner[]) => {
  return partners.map((partner) => ({
    label: partner.name,
    value: String(partner.id),
  }));
};

export const toRemotePayment = (
  userId: string,
  payment: ClientPayment,
  id?: number
): Payment => ({
  id,
  transaction: {
    amount: payment.amount,
    currency: payment.currency,
    transaction_date: `${payment.received_on.getFullYear()}-${String(
      payment.received_on.getMonth() + 1
    ).padStart(2, "0")}-${String(payment.received_on.getDate()).padStart(
      2,
      "0"
    )}`,
    user_id: userId,
  },
  invoice_id: Number(payment.invoice_id),
  partner_id: Number(payment.partner_id),
  type: payment.type,
  local_amount: payment.local_amount,
  local_currency: payment.local_currency,
  transaction_id: 0,
});
