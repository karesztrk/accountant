import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import Layout from "components/Layout";
import { loginPage } from "components/navbar/pages";
import TaxTable from "components/tax-table/TaxTable";
import { cacheKeys, tableNames } from "lib";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import { SWRConfig, unstable_serialize } from "swr";
import { Tax } from "types/database";

interface TaxesProps {
  fallback: Record<string, unknown>;
}

const Taxes: NextPage<TaxesProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Layout title="Taxes">
        <TaxTable />
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
      .from<Tax>(tableNames.tax)
      .select("*, transaction!inner(*)");

    return {
      props: {
        fallback: {
          [unstable_serialize(cacheKeys.taxes)]: data || [],
        },
      },
    };
  },
});

export default Taxes;
