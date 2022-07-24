import InvoiceForm from "components/invoice-form/InvoiceForm";
import Layout from "components/Layout";

const NewInvoice = () => {
  return (
    <Layout size="xs" title="New invoice">
      <InvoiceForm />
    </Layout>
  );
};

export default NewInvoice;
