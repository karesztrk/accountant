import { showNotification } from "@mantine/notifications";
import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import InvoiceForm from "components/invoice-form/InvoiceForm";
import Layout from "components/Layout";
import { loginPage } from "components/navbar/pages";
import { useInvoice } from "hooks/invoice/use-invoice";
import { useInvoiceMutation } from "hooks/invoice/use-invoice-mutation";
import { usePartners } from "hooks/partner/use-partners";
import { cacheKeys, tableNames } from "lib";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { Invoice, Partner } from "types/database";

interface UpdateInvoiceProps {
  id?: string;
  fallbackData?: Invoice;
  partners: Partner[];
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
  const { data: partnersData = [] } = usePartners(partners);

  const onSubmit = (values: Partial<Invoice>) => {
    if (id && values) {
      trigger(values)
        .then(() => {
          mutate(cacheKeys.invoices());
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
        <InvoiceForm
          invoice={data}
          partners={partnersData}
          onSubmit={onSubmit}
        />
      )}
    </Layout>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: loginPage.href,
  async getServerSideProps(
    ctx: GetServerSidePropsContext<{ id?: string }>
  ): Promise<
    GetServerSidePropsResult<{
      id?: string;
      fallbackData?: Invoice;
      partners: Partner[];
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
      .from<Partner>(tableNames.partner)
      .select("*");

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
