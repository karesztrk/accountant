import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import Layout from "components/Layout";
import { loginPage } from "components/navbar/pages";
import PaymentForm from "components/payment-form/PaymentForm";
import { cacheKeys, tableNames } from "lib";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import { SWRConfig, unstable_serialize } from "swr";
import { Partner } from "types/database";

interface UpdatePaymentProps {
  fallback: Record<string, unknown>;
}

const UpdatePayment: NextPage<UpdatePaymentProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Layout size="xs" title="Edit payment">
        <PaymentForm />
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
      .from(tableNames.payment)
      .select("*, transaction!inner(*)")
      .eq("id", id[0])
      .single();

    const { data: partners } = await supabaseServerClient(ctx)
      .from<Partner>(tableNames.partner)
      .select("*");

    return {
      props: {
        fallback: {
          [unstable_serialize(cacheKeys.partners)]: partners || [],
          [unstable_serialize(cacheKeys.payment(id[0]))]: data || undefined,
        },
      },
    };
  },
});

export default UpdatePayment;
