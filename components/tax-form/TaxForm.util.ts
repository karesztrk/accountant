import { Tax as ClientTax } from "types/client";
import { Tax } from "types/database";

export const toTax = (tax: Tax): ClientTax => {
  return {
    ...tax,
    paid_on: tax?.paid_on ? new Date(tax.paid_on) : new Date(),
  };
};

export const toRemoteTax = (tax: ClientTax, id?: number): Tax => ({
  ...tax,
  id,
  paid_on: `${tax.paid_on.getFullYear()}-${String(
    tax.paid_on.getMonth() + 1
  ).padStart(2, "0")}-${String(tax.paid_on.getDate()).padStart(2, "0")}`,
});
