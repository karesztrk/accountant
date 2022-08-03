import { showNotification } from "@mantine/notifications";
import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import Layout from "components/Layout";
import { paymentsPage } from "components/navbar/pages";
import PaymentForm from "components/payment-form/PaymentForm";
import { usePaymentMutation } from "hooks/payment/use-payment-mutation";
import { cacheKeys, tableNames } from "lib";
import { GetServerSidePropsResult, NextPage } from "next";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { Payment, InvoiceNumber } from "types/database";

interface NewPaymentProps {
  invoiceNumbers: InvoiceNumber[];
}

const NewPayment: NextPage<NewPaymentProps> = ({ invoiceNumbers }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { trigger } = usePaymentMutation();

  const onSubmit = (values: Payment) => {
    if (values) {
      trigger(values)
        .then(() => {
          mutate(cacheKeys.payments, undefined, {});
          router.push(paymentsPage.href);
        })
        .catch((error) => {
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
    <Layout size="xs" title="New payment">
      <PaymentForm onSubmit={onSubmit} invoiceNumbers={invoiceNumbers} />
    </Layout>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/",
  async getServerSideProps(
    ctx
  ): Promise<GetServerSidePropsResult<{ invoiceNumbers?: InvoiceNumber[] }>> {
    const { data: invoiceNumbers } = await supabaseServerClient(ctx)
      .from<InvoiceNumber>(tableNames.invoice)
      .select("id, invoice_number");

    return { props: { invoiceNumbers: invoiceNumbers || [] } };
  },
});

export default NewPayment;
