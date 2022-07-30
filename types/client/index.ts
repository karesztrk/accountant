export interface Invoice {
  partner_id: string;
  amount: number;
  issued_on: Date;
  currency: string;
  invoice_number: string;
  paid: boolean;
}

export interface Partner {
  name: string;
  address: string;
  vat: string;
  email?: string;
}
