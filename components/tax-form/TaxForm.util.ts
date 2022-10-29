import { Tax as ClientTax } from "types/client";
import {
  TaxmentWithTransactionInsert,
  TaxWithTransaction,
} from "types/database";

export const toTax = (tax: TaxWithTransaction): ClientTax => {
  return {
    amount: tax?.transaction.amount,
    currency: tax.transaction.currency,
    paid_on: tax?.transaction.transaction_date
      ? new Date(tax.transaction.transaction_date)
      : new Date(),
    description: tax.description || "",
    system: tax.system || "",
  };
};

export const toRemoteTax = (
  userId: string,
  tax: ClientTax,
  id?: number
): TaxmentWithTransactionInsert => ({
  id,
  transaction: {
    amount: tax.amount,
    currency: tax.currency,
    transaction_date: `${tax.paid_on.getFullYear()}-${String(
      tax.paid_on.getMonth() + 1
    ).padStart(2, "0")}-${String(tax.paid_on.getDate()).padStart(2, "0")}`,
    user_id: userId,
  },
  description: tax.description,
  system: tax.system,
  transaction_id: 0,
  user_id: userId,
});
