import { tableNames } from "lib";
import { mutationFetcher, setPaidFetcher } from "lib/fetcher";

export const useInvoiceMutation = () => {
  const trigger = mutationFetcher(tableNames.invoice);

  return {
    trigger,
    setPaid: setPaidFetcher,
  };
};
