import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import Layout from "components/Layout";
import { loginPage } from "components/navbar/pages";
import PaymentForm from "components/payment-form/PaymentForm";
import { cacheKeys, tableNames } from "lib";
import { GetServerSidePropsResult, NextPage } from "next";
import { SWRConfig, unstable_serialize } from "swr";
import { Partner } from "types/database";

interface NewPaymentProps {
  fallback: Record<string, unknown>;
}

const NewPayment: NextPage<NewPaymentProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Layout size="xs" title="New payment">
        <PaymentForm />
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
        fallback: {
          [unstable_serialize(cacheKeys.partners)]: partners || [],
        },
      },
    };
  },
});

export default NewPayment;
