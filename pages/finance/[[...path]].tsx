import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import FinanceTabs from "components/finance-tabs/FinanceTabs";
import Layout from "components/Layout";
import { loginPage } from "components/navbar/pages";
import { cacheKeys, tableNames } from "lib";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import { SWRConfig, unstable_serialize } from "swr";
import { InvoiceWithPartner, Payment, Tax } from "types/database";

interface FinanceProps {
  fallback: Record<string, unknown>;
}

const Finance: NextPage<FinanceProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Layout title="Finance">
        <FinanceTabs />
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
    const { data: invoices } = await supabaseServerClient(ctx)
      .from<InvoiceWithPartner>(tableNames.invoice)
      .select(`*, partner!inner(name)`);

    const { data: payments } = await supabaseServerClient(ctx)
      .from<Payment>(tableNames.payment)
      .select("*, transaction!inner(*)");

    const { data: taxes } = await supabaseServerClient(ctx)
      .from<Tax>(tableNames.tax)
      .select("*, transaction!inner(*)");

    return {
      props: {
        fallback: {
          [unstable_serialize(cacheKeys.invoices)]: invoices || [],
          [unstable_serialize(cacheKeys.payments)]: payments || [],
          [unstable_serialize(cacheKeys.taxes)]: taxes || [],
        },
      },
    };
  },
});

export default Finance;
