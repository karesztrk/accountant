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
import { usePartners } from "hooks/partner/use-partners";
import { cacheKeys, tableNames } from "lib";
import { GetServerSidePropsResult, NextPage } from "next";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { Invoice, Partner } from "types/database";

interface NewInvoiceProps {
  partners: Partner[];
}
const NewInvoice: NextPage<NewInvoiceProps> = ({ partners }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { trigger } = useInvoiceMutation();
  const { data: partnersData = [] } = usePartners(partners);

  const onSubmit = (values: Invoice) => {
    if (values) {
      trigger(values)
        .then(() => {
          mutate(cacheKeys.invoices());
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
      <InvoiceForm onSubmit={onSubmit} partners={partnersData} />
    </Layout>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: loginPage.href,
  async getServerSideProps(
    ctx
  ): Promise<GetServerSidePropsResult<{ partners?: Partner[] }>> {
    const { data: partners } = await supabaseServerClient(ctx)
      .from<Partner>(tableNames.partner)
      .select("*");

    return { props: { partners: partners || [] } };
  },
});

export default NewInvoice;
