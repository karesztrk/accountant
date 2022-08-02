import { tableNames } from "lib";
import { mutationFetcher } from "lib/fetcher";

export const usePaymentMutation = () => {
  const trigger = mutationFetcher(tableNames.payment);

  return {
    trigger,
  };
};
