import { tableNames } from "lib";
import { mutationFetcher } from "lib/fetcher";

export const usePartnerMutation = () => {
  const trigger = mutationFetcher(tableNames.partner);

  return {
    trigger,
  };
};
