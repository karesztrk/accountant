import { tableNames } from "lib";
import { deletionFetcher } from "lib/fetcher";

export const useTaxDeletion = () => {
  const trigger = deletionFetcher(tableNames.tax);

  return {
    trigger,
  };
};
