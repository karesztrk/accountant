import { PaymentType } from "types/database";

export interface Invoice {
  partner_id: string;
  amount: number;
  issued_on: Date;
  currency: string;
  invoice_number: string;
}

export interface Partner {
  name: string;
  address: string;
  vat: string;
  email?: string;
}

export interface Payment {
  invoice_id?: string;
  amount: number;
  currency: string;
  received_on: Date;
  local_amount?: number;
  local_currency?: string;
  type: PaymentType;
  partner_id?: string;
}

export interface Tax {
  amount: number;
  currency: string;
  system?: string;
  description?: string;
  paid_on: Date;
}
