import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import InvoiceForm from "components/invoice-form/InvoiceForm";
import Layout from "components/Layout";
import { useInvoice } from "hooks/invoice/use-invoice";
import { useInvoiceMutation } from "hooks/invoice/use-invoice-mutation";
import { cacheKeys, tableNames } from "lib";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useSWRConfig } from "swr";
import { Invoice } from "types/database";

interface UpdateInvoiceProps {
  id?: string;
  fallbackData?: Invoice;
}

const UpdateInvoice: NextPage<UpdateInvoiceProps> = ({ id, fallbackData }) => {
  const { mutate } = useSWRConfig();
  const { data, error } = useInvoice(id, fallbackData);
  const { trigger } = useInvoiceMutation();

  const onSubmit = (values: Partial<Invoice>) => {
    if (id && values) {
      trigger(id, values).then(() => {
        mutate(cacheKeys.invoices);
      });
    }
  };

  return (
    <Layout size="xs" title="Edit invoice">
      {error && <div>{error.message}</div>}
      <InvoiceForm invoice={data} onSubmit={onSubmit} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: "/",
  async getServerSideProps(ctx: GetServerSidePropsContext<{ id?: string }>) {
    const id = ctx.params?.id;
    if (!id) {
      return { props: { data: undefined } };
    }
    const { data } = await supabaseServerClient(ctx)
      .from(tableNames.invoice)
      .select()
      .eq("id", id)
      .single();

    return { props: { id, fallbackData: data } };
  },
});

export default UpdateInvoice;
