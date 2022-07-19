import { getUser, supabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Invoice } from "types/database";

const handleGetInvoices = async (res: NextApiResponse) => {
  const { data, error } = await supabaseClient.from("invoice").select();
  if (error) {
    return res.status(500).json({ message: error.message });
  }
  return res.status(200).json(data);
};

const handlePostInvoices = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { user } = await getUser({ req, res });

  const value: Partial<Invoice> = {
    invoice_number: req.body.invoice_number,
    amount: req.body.amount,
    currency: req.body.currency,
    issued_on: req.body.issued_on,
    partner_name: req.body.partner_name,
    paid: req.body.paid,
    user_id: user.id,
  };

  const { data, error, status } = await supabaseClient
    .from("invoice")
    .insert([value]);
  if (error) {
    return res.status(500).json({ message: error.message });
  }
  return res.status(status).end();
};

const InvoiceApi = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return handleGetInvoices(res);

    case "POST":
      return handlePostInvoices(req, res);

    default:
      return res.status(405).json({
        message: "Method Not Allowed",
      });
  }
};

export default InvoiceApi;
