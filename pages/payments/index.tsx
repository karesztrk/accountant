import { showNotification } from "@mantine/notifications";
import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import Layout from "components/Layout";
import PaymentTable from "components/payment-table/PaymentTable";
import { usePayments } from "hooks/payment/use-payments";
import { tableNames } from "lib";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import { useEffect } from "react";
import { Payment } from "types/database";

interface PaymentsProps {
  fallbackData: Payment[];
}

const Payments: NextPage<PaymentsProps> = ({ fallbackData }) => {
  const { data = [], error } = usePayments(fallbackData);

  useEffect(() => {
    if (error) {
      showNotification({
        id: error.code,
        title: "Error",
        message: error.message,
        color: "red",
      });
    }
  }, [error]);

  return (
    <Layout title="Payments">{data && <PaymentTable payments={data} />}</Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: "/",
  async getServerSideProps(ctx): Promise<
    GetServerSidePropsResult<{
      fallbackData: Payment[];
    }>
  > {
    const { data } = await supabaseServerClient(ctx)
      .from<Payment>(tableNames.payment)
      .select("*");
    return { props: { fallbackData: data || [] } };
  },
});

export default Payments;
