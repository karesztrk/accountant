import { getUser, supabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Invoice } from "types/database";

const handleGetInvoices = async (req: NextApiRequest, res: NextApiResponse) => {
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
  const { invoice_number, amount, currency, issued_on, partner_name, paid } =
    req.body;
  const { user } = await getUser({ req, res });

  const value: Partial<Invoice> = {
    invoice_number,
    amount,
    currency,
    issued_on,
    partner_name,
    paid,
    user_id: user.id,
  };

  const { error, status } = await supabaseClient.from("invoice").insert(value);
  if (error) {
    return res.status(500).json({ message: error.message });
  }
  return res.status(status).end();
};

const handlePutInvoices = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    id,
    invoice_number,
    amount,
    currency,
    issued_on,
    partner_name,
    paid,
  } = req.body;
  const { user } = await getUser({ req, res });

  const value: Partial<Invoice> = {
    invoice_number,
    amount,
    currency,
    issued_on,
    partner_name,
    paid,
    user_id: user.id,
  };

  const { error, status } = await supabaseClient
    .from("invoice")
    .update(value)
    .eq("id", id);
  if (error) {
    return res.status(500).json({ message: error.message });
  }
  return res.status(status).end();
};

const handleDeleteInvoices = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.body;

  const { error, status } = await supabaseClient
    .from("invoice")
    .delete()
    .eq("id", id);
  if (error) {
    return res.status(500).json({ message: error.message });
  }
  return res.status(status).end();
};

const InvoiceApi = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return handleGetInvoices(req, res);

    case "POST":
      return handlePostInvoices(req, res);

    case "PUT":
      return handlePutInvoices(req, res);

    case "DELETE":
      return handleDeleteInvoices(req, res);

    default:
      return res.status(405).json({
        message: "Method Not Allowed",
      });
  }
};

export default InvoiceApi;
