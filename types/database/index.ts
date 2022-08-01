export interface InvoiceWithPartner extends Invoice {
  partner: {
    name: string;
  };
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

export interface Partner {
  id?: number;
  name: string;
  address: string;
  vat: string;
  email?: string;
  user_id: string;
}

export type PartnerName = Pick<Partner, "id" | "name">;
