import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import InvoiceForm from "components/invoice-form/InvoiceForm";
import Layout from "components/Layout";
import { useInvoiceMutation } from "hooks/invoice/use-invoice-mutation";
import { cacheKeys, tableNames } from "lib";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from "next";
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
      <InvoiceForm onSubmit={onSubmit} partners={partners} />
    </Layout>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/",
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
