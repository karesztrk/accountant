import { showNotification } from "@mantine/notifications";
import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import InvoiceForm from "components/invoice-form/InvoiceForm";
import Layout from "components/Layout";
import { loginPage } from "components/navbar/pages";
import { useInvoiceMutation } from "hooks/invoice/use-invoice-mutation";
import { cacheKeys, tableNames } from "lib";
import { GetServerSidePropsResult, NextPage } from "next";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { Invoice, PartnerName } from "types/database";

interface NewInvoiceProps {
  partners: PartnerName[];
}
const NewInvoice: NextPage<NewInvoiceProps> = ({ partners }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { trigger } = useInvoiceMutation();

  const onSubmit = (values: Invoice) => {
    if (values) {
      trigger(values)
        .then(() => {
          mutate(cacheKeys.invoices);
          router.push("/invoices");
        })
        .catch((error: PostgrestError) => {
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
    <Layout size="xs" title="New invoice">
      <InvoiceForm onSubmit={onSubmit} partners={partners} />
    </Layout>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: loginPage.href,
  async getServerSideProps(
    ctx
  ): Promise<GetServerSidePropsResult<{ partners?: PartnerName[] }>> {
    const { data: partners } = await supabaseServerClient(ctx)
      .from<PartnerName>(tableNames.partner)
      .select("id, name");

    return { props: { partners: partners || [] } };
  },
});

export default NewInvoice;
