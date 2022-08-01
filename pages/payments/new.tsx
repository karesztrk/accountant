import { showNotification } from "@mantine/notifications";
import Layout from "components/Layout";
import { paymentsPage } from "components/navbar/pages";
import PaymentForm from "components/payment-form/PaymentForm";
import { usePaymentMutation } from "hooks/payment/use-payment-mutation";
import { cacheKeys } from "lib";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { Payment } from "types/database";

const NewPayment = () => {
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
      <PaymentForm onSubmit={onSubmit} />
    </Layout>
  );
};

export default NewPayment;
