import { tableNames } from "lib";
import { deletionFetcher } from "lib/fetcher";

export const useInvoiceDeletion = () => {
  const trigger = deletionFetcher(tableNames.invoice);

  return {
    trigger,
  };
};
