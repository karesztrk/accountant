import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

const InvoiceApi = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const { data, error } = await supabaseClient.from("invoice").select();
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(200).json(data);

    default:
      return res.status(405).json({
        message: "Method Not Allowed",
      });
  }
};

export default InvoiceApi;
