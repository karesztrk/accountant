import { useUser } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys } from "lib";
import { dashboardFetcher } from "lib/fetcher/dashboard";
import useSWR from "swr";
import { Expense, Income } from "types/database";

interface DashboardData {
  income: Income[];
  expense: Expense[];
}

export const useDashboardData = (fallbackData?: DashboardData) => {
  const user = useUser();
  const key = user ? cacheKeys.dashboardData() : null;
  return useSWR<DashboardData, PostgrestError>(key, dashboardFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData,
  });
};
