import { showNotification } from "@mantine/notifications";
import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import Layout from "components/Layout";
import { loginPage, paymentsPage } from "components/navbar/pages";
import PaymentForm from "components/payment-form/PaymentForm";
import { useInvoices } from "hooks/invoice/use-invoices";
import { usePaymentMutation } from "hooks/payment/use-payment-mutation";
import { cacheKeys, tableNames } from "lib";
import { GetServerSidePropsResult, NextPage } from "next";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { Payment, Invoice, InvoiceWithPartner } from "types/database";

interface NewPaymentProps {
  invoices: InvoiceWithPartner[];
}

const NewPayment: NextPage<NewPaymentProps> = ({ invoices }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { trigger } = usePaymentMutation();
  const { data: invoicesData = [] } = useInvoices(invoices);

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
      <PaymentForm onSubmit={onSubmit} invoices={invoicesData} />
    </Layout>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: loginPage.href,
  async getServerSideProps(
    ctx
  ): Promise<GetServerSidePropsResult<{ invoices?: Invoice[] }>> {
    const { data } = await supabaseServerClient(ctx)
      .from<InvoiceWithPartner>(tableNames.invoice)
      .select(`*, partner!inner(name)`);

    return { props: { invoices: data || [] } };
  },
});

export default NewPayment;
