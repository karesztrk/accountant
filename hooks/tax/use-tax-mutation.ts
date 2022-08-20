import { tableNames } from "lib";
import { taxMutationFetcher } from "lib/fetcher/tax";

export const useTaxMutation = () => {
  const trigger = taxMutationFetcher(tableNames.tax);

  return {
    trigger,
  };
};
