import { Partner as ServerPartner } from "../database";

export interface Invoice {
  partner_name: string;
  amount: number;
  issued_on: Date;
  currency: string;
  invoice_number: string;
  paid: boolean;
}

export type Partner = ServerPartner;
