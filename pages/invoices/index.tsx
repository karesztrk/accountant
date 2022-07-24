import InvoiceTable from "components/invoice-table/InvoiceTable";
import Layout from "components/Layout";
import type { NextPage } from "next";

const Invoices: NextPage = () => {
  return (
    <Layout title="Invoices">
      <InvoiceTable />
    </Layout>
  );
};

export default Invoices;
