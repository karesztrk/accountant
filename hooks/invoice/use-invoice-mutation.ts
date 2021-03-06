import { tableNames } from "lib";
import { mutationFetcher } from "lib/fetcher";

export const useInvoiceMutation = () => {
  const trigger = mutationFetcher(tableNames.invoice);

  return {
    trigger,
  };
};
