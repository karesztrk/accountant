import { LoadingOverlay } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
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
      trigger(values)
        .then(() => {
          mutate(cacheKeys.invoices);
          router.push("/invoices");
        })
        .catch((error) => {
          showNotification({
            id: error.code,
            title: "Error",
            message: error.message,
            color: "red",
          });
        });
    }
  };

  return (
    <Layout size="xs" title="Edit invoice">
      {data && (
        <InvoiceForm invoice={data} partners={partners} onSubmit={onSubmit} />
      )}
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
    const id = ctx.query.id;
    if (!id) {
      return { props: { partners: [] } };
    }

    const { data } = await supabaseServerClient(ctx)
      .from<Invoice>(tableNames.invoice)
      .select()
      .eq("id", id[0])
      .single();

    const { data: partners } = await supabaseServerClient(ctx)
      .from<PartnerName>(tableNames.partner)
      .select("id, name");

    return {
      props: {
        id: id[0],
        fallbackData: data || undefined,
        partners: partners || [],
      },
    };
  },
});

export default UpdateInvoice;
