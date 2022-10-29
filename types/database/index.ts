import { Database } from "./gen";

export interface Base {
  id?: number;
}

export interface InvoiceWithPartner extends Invoice {
  partner: Pick<Partner, "name">;
}

export type Invoice = Database["public"]["Tables"]["invoice"]["Row"];
export type InvoiceInsert = Database["public"]["Tables"]["invoice"]["Insert"];

export type Partner = Database["public"]["Tables"]["partner"]["Row"];
export type PartnerInsert = Database["public"]["Tables"]["partner"]["Insert"];

export type PartnerName = Pick<Partner, "id" | "name">;

export type PaymentType = string;

export type Transaction = Database["public"]["Tables"]["transaction"]["Row"];
export type TransactionInsert =
  Database["public"]["Tables"]["transaction"]["Insert"];

export type Payment = Database["public"]["Tables"]["payment"]["Row"];
export type PaymentInsert = Database["public"]["Tables"]["payment"]["Insert"];

export type PaymentWithTransaction = Payment & { transaction: Transaction };
export type PaymentWithTransactionInsert = PaymentInsert & {
  transaction: TransactionInsert;
};

export type Tax = Database["public"]["Tables"]["tax"]["Row"];
export type TaxInsert = Database["public"]["Tables"]["tax"]["Insert"];

export type TaxWithTransaction = Tax & { transaction: Transaction };
export type TaxmentWithTransactionInsert = TaxInsert & {
  transaction: TransactionInsert;
};

export type Income = Database["public"]["Views"]["income_per_month"]["Row"];

export type Expense = Database["public"]["Views"]["expense_per_month"]["Row"];

export type Tables = keyof Database["public"]["Tables"];
export type Views = keyof Database["public"]["Views"];

export type Upsert = Database["public"]["Tables"][Tables]["Insert"];
