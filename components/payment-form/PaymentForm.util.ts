import { InvoiceWithPartner, Payment } from "types/database";
import { Payment as ClientPayment } from "types/client";

export const toPayment = (payment: Payment): ClientPayment => {
  return {
    ...payment,
    paid_on: payment?.paid_on ? new Date(payment.paid_on) : new Date(),
    invoice_id: String(payment.invoice_id),
  };
};

export const toInvoices = (invoices: InvoiceWithPartner[]) => {
  return invoices.map((invoice) => ({
    label: `${invoice.invoice_number}`,
    description: `${invoice.amount} ${invoice.currency}`,
    value: invoice.id?.toString() || "",
    group: invoice.partner.name,
  }));
};

export const toRemotePayment = (
  payment: ClientPayment,
  id?: number
): Payment => ({
  ...payment,
  id,
  paid_on: `${payment.paid_on.getFullYear()}-${String(
    payment.paid_on.getMonth() + 1
  ).padStart(2, "0")}-${String(payment.paid_on.getDate()).padStart(2, "0")}`,
  invoice_id: Number(payment.invoice_id),
});
