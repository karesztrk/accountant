import { tableNames } from "lib";
import { deletionFetcher } from "lib/fetcher";

export const usePaymentDeletion = () => {
  const trigger = deletionFetcher(tableNames.payment);

  return {
    trigger,
  };
};
