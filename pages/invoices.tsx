import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import InvoiceTable from "../components/invoice-table/InvoiceTable";
import Layout from "../components/Layout";
import { Invoice } from "types/database";

const Income: NextPage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    supabaseClient
      .from<Invoice>("invoice")
      .select()
      .then((result) => {
        if (result.data) {
          setInvoices(result.data);
        }
      });
  }, []);

  return (
    <>
      <Layout>
        <InvoiceTable invoices={invoices} />
      </Layout>
    </>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/",
});

export default Income;
