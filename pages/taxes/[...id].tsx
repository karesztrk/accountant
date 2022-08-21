import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import Layout from "components/Layout";
import { loginPage } from "components/navbar/pages";
import TaxForm from "components/tax-form/TaxForm";
import { cacheKeys, tableNames } from "lib";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import { SWRConfig, unstable_serialize } from "swr";

interface UpdateTaxProps {
  fallback: Record<string, unknown>;
}

const UpdateTax: NextPage<UpdateTaxProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Layout size="xs" title="Edit tax">
        <TaxForm />
      </Layout>
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: loginPage.href,
  async getServerSideProps(
    ctx: GetServerSidePropsContext<{ id?: string }>
  ): Promise<
    GetServerSidePropsResult<{
      fallback?: Record<string, unknown>;
    }>
  > {
    const id = ctx.query.id;
    if (!id) {
      return { props: {} };
    }
    const { data } = await supabaseServerClient(ctx)
      .from(tableNames.tax)
      .select("*, transaction!inner(*)")
      .eq("id", id[0])
      .single();

    return {
      props: {
        fallback: {
          [unstable_serialize(cacheKeys.tax(id[0]))]: data || undefined,
        },
      },
    };
  },
});

export default UpdateTax;
