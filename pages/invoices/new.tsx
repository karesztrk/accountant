import Layout from "components/Layout";
import { useInvoiceMutation } from "hooks/use-invoice-mutation";
import { useRouter } from "next/router";
import InvoiceForm from "components/invoice-form/InvoiceForm";
import { Invoice } from "types/client";

const initialValues: Invoice = {
  invoice_number: "",
  partner_name: "",
  amount: 0,
  issued_on: new Date(),
  currency: "EUR",
  paid: false,
};

const NewInvoice = () => {
  const { push } = useRouter();
  const { fetcher } = useInvoiceMutation();

  const onSubmit = (values: Invoice) => {
    fetcher(values)
      .then(() => {
        push("/invoices");
      })
      // TODO display error
      .catch(console.error);
  };

  return (
    <Layout size="xs">
      <InvoiceForm initialValues={initialValues} onSubmit={onSubmit} />
    </Layout>
  );
};

export default NewInvoice;
