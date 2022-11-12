export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      invoice: {
        Row: {
          id: number;
          created_at: string;
          amount: number;
          issued_on: string;
          currency: string;
          invoice_number: string;
          partner_id: number;
          url: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string;
          amount: number;
          issued_on: string;
          currency: string;
          invoice_number: string;
          partner_id: number;
          url?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string;
          amount?: number;
          issued_on?: string;
          currency?: string;
          invoice_number?: string;
          partner_id?: number;
          url?: string | null;
        };
      };
      partner: {
        Row: {
          id: number;
          created_at: string | null;
          name: string;
          address: string;
          vat: string;
          email: string | null;
          user_id: string;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          name: string;
          address: string;
          vat: string;
          email?: string | null;
          user_id: string;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          name?: string;
          address?: string;
          vat?: string;
          email?: string | null;
          user_id?: string;
        };
      };
      payment: {
        Row: {
          id: number;
          created_at: string | null;
          invoice_id: number | null;
          local_amount: number | null;
          local_currency: string | null;
          type: string;
          partner_id: number;
          transaction_id: number;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          invoice_id?: number | null;
          local_amount?: number | null;
          local_currency?: string | null;
          type?: string;
          partner_id: number;
          transaction_id: number;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          invoice_id?: number | null;
          local_amount?: number | null;
          local_currency?: string | null;
          type?: string;
          partner_id?: number;
          transaction_id?: number;
        };
      };
      tax: {
        Row: {
          id: number;
          created_at: string | null;
          system: string | null;
          description: string | null;
          user_id: string;
          transaction_id: number;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          system?: string | null;
          description?: string | null;
          user_id: string;
          transaction_id: number;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          system?: string | null;
          description?: string | null;
          user_id?: string;
          transaction_id?: number;
        };
      };
      transaction: {
        Row: {
          id: number;
          created_at: string | null;
          amount: number;
          currency: string;
          transaction_date: string | null;
          user_id: string;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          amount: number;
          currency: string;
          transaction_date?: string | null;
          user_id: string;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          amount?: number;
          currency?: string;
          transaction_date?: string | null;
          user_id?: string;
        };
      };
    };
    Views: {
      expense_per_month: {
        Row: {
          period: string | null;
          currency: string | null;
          amount: number | null;
        };
      };
      income_per_month: {
        Row: {
          period: string | null;
          currency: string | null;
          amount: number | null;
          local_currency: string | null;
          local_amount: number | null;
        };
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
