import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import InvoiceForm from "components/invoice-form/InvoiceForm";
import Layout from "components/Layout";
import { loginPage } from "components/navbar/pages";
import { cacheKeys, tableNames } from "lib";
import { GetServerSidePropsResult, NextPage } from "next";
import { SWRConfig, unstable_serialize } from "swr";
import { Partner } from "types/database";

interface NewInvoiceProps {
  fallback: Record<string, unknown>;
}
const NewInvoice: NextPage<NewInvoiceProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Layout size="xs" title="New invoice">
        <InvoiceForm />
      </Layout>
    </SWRConfig>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: loginPage.href,
  async getServerSideProps(
    ctx
  ): Promise<GetServerSidePropsResult<{ fallback: Record<string, unknown> }>> {
    const { data: partners } = await supabaseServerClient(ctx)
      .from<Partner>(tableNames.partner)
      .select("*");

    return {
      props: {
        fallback: { [unstable_serialize(cacheKeys.partners)]: partners || [] },
      },
    };
  },
});

export default NewInvoice;
