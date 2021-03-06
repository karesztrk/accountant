import { showNotification } from "@mantine/notifications";
import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import Layout from "components/Layout";
import { paymentsPage } from "components/navbar/pages";
import PaymentForm from "components/payment-form/PaymentForm";
import { usePayment } from "hooks/payment/use-payment";
import { usePaymentMutation } from "hooks/payment/use-payment-mutation";
import { cacheKeys, tableNames } from "lib";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { Payment } from "types/database";

interface UpdatePartnerProps {
  id?: string;
  fallbackData?: Payment;
}

const UpdatePartner: NextPage<UpdatePartnerProps> = ({ id, fallbackData }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data } = usePayment(id, fallbackData);
  const { trigger } = usePaymentMutation();

  const onSubmit = (values: Payment) => {
    if (id && values) {
      trigger(values)
        .then(() => {
          mutate(cacheKeys.partners);
          router.push(paymentsPage.href);
        })
        .catch((error: PostgrestError) => {
          showNotification({
            id: error.code,
            title: "Error",
            message: error.message,
            color: "red",
          });
        });
    }
  };

  return (
    <Layout size="xs" title="Edit payment">
      {data && <PaymentForm payment={data} onSubmit={onSubmit} />}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: "/",
  async getServerSideProps(
    ctx: GetServerSidePropsContext<{ id?: string }>
  ): Promise<
    GetServerSidePropsResult<{
      id?: string;
      fallbackData?: Payment;
    }>
  > {
    const id = ctx.query.id;
    if (!id) {
      return { props: {} };
    }
    const { data } = await supabaseServerClient(ctx)
      .from(tableNames.payment)
      .select()
      .eq("id", id[0])
      .single();

    return { props: { id: id[0], fallbackData: data } };
  },
});

export default UpdatePartner;
