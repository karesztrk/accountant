export interface Invoice {
  id: number;
  created_at: string;
  partner_name: string;
  amount: number;
  issued_on: string;
  currency: string;
  user_id: string;
  invoice_number: string;
  paid: boolean;
}
