import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import Layout from "components/Layout";
import { loginPage } from "components/navbar/pages";
import PartnerTable from "components/partner-table/PartnerTable";
import { cacheKeys, tableNames } from "lib";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import { SWRConfig, unstable_serialize } from "swr";
import { Partner } from "types/database";

interface PartnersProps {
  fallback: Record<string, unknown>;
}

const Partners: NextPage<PartnersProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Layout title="Partners">
        <PartnerTable />
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
      .from<Partner>(tableNames.partner)
      .select("*");
    return {
      props: {
        fallback: {
          [unstable_serialize(cacheKeys.partners)]: data || [],
        },
      },
    };
  },
});

export default Partners;
