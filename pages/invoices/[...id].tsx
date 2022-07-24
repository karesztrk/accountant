import InvoiceForm from "components/invoice-form/InvoiceForm";
import Layout from "components/Layout";
import { NextPage } from "next";

const UpdateInvoice: NextPage = () => {
  return (
    <Layout size="xs">
      <InvoiceForm />
    </Layout>
  );
};

export default UpdateInvoice;
