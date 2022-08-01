import { Payment } from "types/database";
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

export const toRemotePayment = (
  { amount, currency, paid_on, invoice_id }: ClientPayment,
  id?: number
): Payment => ({
  id,
  amount,
  currency,
  paid_on: paid_on.toISOString(),
  invoice_id: Number(invoice_id),
});
