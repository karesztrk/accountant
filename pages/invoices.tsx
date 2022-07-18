import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useInvoices } from "hooks/use-invoices";
import type { NextPage } from "next";
import InvoiceTable from "../components/invoice-table/InvoiceTable";
import Layout from "../components/Layout";

const Income: NextPage = () => {
  const { data = [] } = useInvoices();

  return (
    <>
      <Layout>
        <InvoiceTable invoices={data} />
      </Layout>
    </>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/",
});

export default Income;
