export interface Invoice {
  partner_name: string;
  amount: number;
  issued_on: Date;
  currency: string;
  invoice_number: string;
  paid: boolean;
}
