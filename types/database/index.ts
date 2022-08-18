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

export interface Payment {
  id?: number;
  invoice_id?: number;
  amount: number;
  currency: string;
  received_on: string;
  type: PaymentType;
  local_amount?: number;
  local_currency?: string;
  partner_id: number;
}

export interface Tax {
  id?: number;
  amount: number;
  currency: string;
  system?: string;
  description?: string;
  paid_on: string;
}

export interface Revenue {
  date: string;
  sum: number;
  currency: string;
}
