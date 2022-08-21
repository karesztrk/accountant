import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import Layout from "components/Layout";
import { loginPage } from "components/navbar/pages";
import PaymentTable from "components/payment-table/PaymentTable";
import { cacheKeys, tableNames } from "lib";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import { SWRConfig, unstable_serialize } from "swr";
import { Payment } from "types/database";

interface PaymentsProps {
  fallback: Record<string, unknown>;
}

const Payments: NextPage<PaymentsProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Layout title="Payments">
        <PaymentTable />
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
      .from<Payment>(tableNames.payment)
      .select("*, transaction!inner(*)");

    return {
      props: {
        fallback: {
          [unstable_serialize(cacheKeys.payments)]: data || [],
        },
      },
    };
  },
});

export default Payments;
