import { tableNames } from "lib";
import { paymentMutationFetcher } from "lib/fetcher/payment";

export const usePaymentMutation = () => {
  const trigger = paymentMutationFetcher(tableNames.payment);

  return {
    trigger,
  };
};
