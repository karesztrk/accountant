import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import InvoiceForm from "components/invoice-form/InvoiceForm";
import Layout from "components/Layout";
import { useInvoice } from "hooks/invoice/use-invoice";
import { useInvoiceMutation } from "hooks/invoice/use-invoice-mutation";
import { cacheKeys, tableNames } from "lib";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { Invoice, PartnerName } from "types/database";

interface UpdateInvoiceProps {
  id?: string;
  fallbackData?: Invoice;
  partners: PartnerName[];
}

const UpdateInvoice: NextPage<UpdateInvoiceProps> = ({
  id,
  fallbackData,
  partners = [],
}) => {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { data, error } = useInvoice(id, fallbackData);
  const { trigger } = useInvoiceMutation();

  const onSubmit = (values: Partial<Invoice>) => {
    if (id && values) {
      trigger(id, values)
        .then(() => {
          mutate(cacheKeys.invoices);
          router.push("/invoices");
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <Layout size="xs" title="Edit invoice">
      {error && <div>{error.message}</div>}
      <InvoiceForm invoice={data} partners={partners} onSubmit={onSubmit} />
    </Layout>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/",
  async getServerSideProps(
    ctx: GetServerSidePropsContext<{ id?: string }>
  ): Promise<
    GetServerSidePropsResult<{
      id?: string;
      fallbackData?: Invoice;
      partners: PartnerName[];
    }>
  > {
    const id = ctx.params?.id;
    if (!id) {
      return { props: { partners: [] } };
    }
    const { data } = await supabaseServerClient(ctx)
      .from<Invoice>(tableNames.invoice)
      .select()
      .eq("id", id)
      .single();

    const { data: partners } = await supabaseServerClient(ctx)
      .from<PartnerName>(tableNames.partner)
      .select("id, name");

    return {
      props: { id, fallbackData: data || undefined, partners: partners || [] },
    };
  },
});

export default UpdateInvoice;
