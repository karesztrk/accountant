import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import FinanceTabs from "components/finance-tabs/FinanceTabs";
import Layout from "components/Layout";
import { loginPage } from "components/navbar/pages";
import { cacheKeys, tableNames } from "lib";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import { SWRConfig, unstable_serialize } from "swr";
import { Database } from "types/database/gen";

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

export const getServerSideProps: GetServerSideProps = withPageAuth<Database>({
  redirectTo: loginPage.href,
  async getServerSideProps(
    _ctx,
    supabase
  ): Promise<
    GetServerSidePropsResult<{
      fallback: Record<string, unknown>;
    }>
  > {
    const { data: invoices } = await supabase
      .from(tableNames.invoice)
      .select(`*, partner!inner(name)`);

    const { data: payments } = await supabase
      .from(tableNames.payment)
      .select("*, transaction!inner(*)");

    const { data: taxes } = await supabase
      .from(tableNames.tax)
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
