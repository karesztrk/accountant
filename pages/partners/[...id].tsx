import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import Layout from "components/Layout";
import { loginPage } from "components/navbar/pages";
import PartnerForm from "components/partner-form/PartnerForm";
import { cacheKeys, tableNames } from "lib";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import { SWRConfig, unstable_serialize } from "swr";
import { Partner } from "types/database";

interface UpdatePartnerProps {
  fallback: Record<string, unknown>;
}

const UpdatePartner: NextPage<UpdatePartnerProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Layout size="xs" title="Edit partner">
        <PartnerForm />
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
      fallback: Record<string, unknown>;
    }>
  > {
    const id = ctx.query.id;
    if (!id) {
      return { props: { fallback: {} } };
    }
    const { data } = await supabaseServerClient(ctx)
      .from<Partner>(tableNames.partner)
      .select()
      .eq("id", id[0])
      .single();

    return {
      props: {
        fallback: {
          [unstable_serialize(cacheKeys.partner(id[0]))]: data || [],
        },
      },
    };
  },
});

export default UpdatePartner;
