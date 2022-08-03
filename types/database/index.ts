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
  paid: boolean;
}

export type InvoiceNumber = Pick<Invoice, "id" | "invoice_number">;

export interface Partner {
  id?: number;
  name: string;
  address: string;
  vat: string;
  email?: string;
  user_id: string;
}

export type PartnerName = Pick<Partner, "id" | "name">;

export interface Payment {
  id?: number;
  invoice_id?: number;
  amount: number;
  currency: string;
  paid_on: string;
}

export interface PaymentWithInvoice extends Payment {
  invoice: Pick<Invoice, "invoice_number">;
}
