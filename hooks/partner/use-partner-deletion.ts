import { tableNames } from "lib";
import { deletionFetcher } from "lib/fetcher";

export const usePartnerDeletion = () => {
  const trigger = deletionFetcher(tableNames.partner);

  return {
    trigger,
  };
};
