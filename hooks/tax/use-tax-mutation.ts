import { tableNames } from "lib";
import { mutationFetcher } from "lib/fetcher";

export const useTaxMutation = () => {
  const trigger = mutationFetcher(tableNames.tax);

  return {
    trigger,
  };
};
