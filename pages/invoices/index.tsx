import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import InvoiceTable from "components/invoice-table/InvoiceTable";
import Layout from "components/Layout";
import { loginPage } from "components/navbar/pages";
import { cacheKeys, tableNames } from "lib";
import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import { SWRConfig, unstable_serialize } from "swr";
import { InvoiceWithPartner } from "types/database";

interface InvoicesProps {
  fallback: Record<string, unknown>;
}

const Invoices: NextPage<InvoicesProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Layout title="Invoices">
        <InvoiceTable />
      </Layout>
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: loginPage.href,
  async getServerSideProps(ctx): Promise<
    GetServerSidePropsResult<{
      fallback: Record<string, unknown>;
    }>
  > {
    const { data } = await supabaseServerClient(ctx)
      .from<InvoiceWithPartner>(tableNames.invoice)
      .select(`*, partner!inner(name)`);

    return {
      props: {
        fallback: {
          [unstable_serialize(cacheKeys.invoices)]: data || [],
        },
      },
    };
  },
});

export default Invoices;
