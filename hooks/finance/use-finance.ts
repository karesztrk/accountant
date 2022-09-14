import { cacheKeys } from "lib";
import useSWR from "swr";

interface State {
  opened: boolean;
}

const fallbackData: State = {
  opened: false,
};

const useFinance = () => {
  return useSWR<State>(cacheKeys.finance, { fallbackData });
};

export default useFinance;
