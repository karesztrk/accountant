export interface Base {
  id?: any;
}

export interface InvoiceWithPartner extends Invoice {
  partner: Pick<Partner, "name">;
}

export interface Invoice {
  id?: number;
  partner_id: number;
  amount: number;
  issued_on: string;
  currency: string;
  invoice_number: string;
}

export interface Partner {
  id?: number;
  name: string;
  address: string;
  vat: string;
  email?: string;
  user_id: string;
}

export type PartnerName = Pick<Partner, "id" | "name">;

export type PaymentType = "simple" | "foreign";

export interface Transaction {
  amount: number;
  currency: string;
  transaction_date: string;
}

export interface Payment {
  id?: number;
  invoice_id?: number;
  type: PaymentType;
  local_amount?: number;
  local_currency?: string;
  partner_id: number;
  transaction: Transaction;
}

export interface Tax {
  id?: number;
  system?: string;
  description?: string;
  transaction: Transaction;
}

export interface Income {
  period: string;
  amount: number;
  currency: string;
}
