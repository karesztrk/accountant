import { showNotification } from "@mantine/notifications";
import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import Layout from "components/Layout";
import { loginPage, paymentsPage } from "components/navbar/pages";
import PaymentForm from "components/payment-form/PaymentForm";
import { useInvoices } from "hooks/invoice/use-invoices";
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
import { InvoiceWithPartner, Payment } from "types/database";

interface UpdatePaymentProps {
  id?: string;
  fallbackData?: Payment;
  invoices: InvoiceWithPartner[];
}

const UpdatePayment: NextPage<UpdatePaymentProps> = ({
  id,
  fallbackData,
  invoices,
}) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data } = usePayment(id, fallbackData);
  const { trigger } = usePaymentMutation();
  const { data: invoicesData = [] } = useInvoices(invoices);

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
      {data && (
        <PaymentForm
          payment={data}
          onSubmit={onSubmit}
          invoices={invoicesData}
        />
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: loginPage.href,
  async getServerSideProps(
    ctx: GetServerSidePropsContext<{ id?: string }>
  ): Promise<
    GetServerSidePropsResult<{
      id?: string;
      fallbackData?: Payment;
      invoices: InvoiceWithPartner[];
    }>
  > {
    const id = ctx.query.id;
    if (!id) {
      return { props: { invoices: [] } };
    }
    const { data } = await supabaseServerClient(ctx)
      .from(tableNames.payment)
      .select()
      .eq("id", id[0])
      .single();

    const { data: invoices } = await supabaseServerClient(ctx)
      .from<InvoiceWithPartner>(tableNames.invoice)
      .select(`*, partner!inner(name)`);

    return {
      props: {
        id: id[0],
        fallbackData: data,
        invoices: invoices || [],
      },
    };
  },
});

export default UpdatePayment;
