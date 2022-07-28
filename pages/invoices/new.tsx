import InvoiceForm from "components/invoice-form/InvoiceForm";
import Layout from "components/Layout";
import { useInvoiceMutation } from "hooks/use-invoice-mutation";
import { cacheKeys } from "lib";
import { useSWRConfig } from "swr";
import { Invoice } from "types/database";

const NewInvoice = () => {
  const { mutate } = useSWRConfig();
  const { trigger } = useInvoiceMutation();

  const onSubmit = (values: Partial<Invoice>) => {
    if (values) {
      trigger(undefined, values).then(() => {
        mutate(cacheKeys.invoices);
      });
    }
  };

  return (
    <Layout size="xs" title="New invoice">
      <InvoiceForm onSubmit={onSubmit} />
    </Layout>
  );
};

export default NewInvoice;
