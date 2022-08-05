import { InvoiceNumber, Payment } from "types/database";
import { Payment as ClientPayment } from "types/client";

export const toPayment = (payment: Payment): ClientPayment => {
  return {
    ...payment,
    paid_on: payment?.paid_on ? new Date(payment.paid_on) : new Date(),
    invoice_id: String(payment.invoice_id),
    amount: payment.amount,
    currency: payment.currency,
  };
};

export const toInvoices = (invoiceNumbers: InvoiceNumber[]) => {
  return invoiceNumbers.map((invoice) => ({
    label: invoice.invoice_number,
    value: String(invoice.id),
  }));
};

export const toRemotePayment = (
  { amount, currency, paid_on, invoice_id }: ClientPayment,
  id?: number
): Payment => ({
  id,
  amount,
  currency,
  paid_on: `${paid_on.getFullYear()}-${String(paid_on.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(paid_on.getDate()).padStart(2, "0")}`,
  invoice_id: Number(invoice_id),
});
