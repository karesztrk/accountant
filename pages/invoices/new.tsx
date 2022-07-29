import InvoiceForm from "components/invoice-form/InvoiceForm";
import Layout from "components/Layout";
import { useInvoiceMutation } from "hooks/invoice/use-invoice-mutation";
import { cacheKeys } from "lib";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { Invoice } from "types/database";

const NewInvoice = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { trigger } = useInvoiceMutation();

  const onSubmit = (values: Partial<Invoice>) => {
    if (values) {
      trigger(undefined, values)
        .then(() => {
          mutate(cacheKeys.invoices);
          router.push("/invoices");
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <Layout size="xs" title="New invoice">
      <InvoiceForm onSubmit={onSubmit} />
    </Layout>
  );
};

export default NewInvoice;
