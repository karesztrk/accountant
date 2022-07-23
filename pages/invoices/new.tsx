import InvoiceForm from "components/invoice-form/InvoiceForm";
import Layout from "components/Layout";
import { useRouter } from "next/router";

const NewInvoice = () => {
  const { push } = useRouter();

  return (
    <Layout size="xs">
      <InvoiceForm />
    </Layout>
  );
};

export default NewInvoice;
