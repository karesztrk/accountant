import { useUser } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { cacheKeys } from "lib";
import { dashboardFetcher } from "lib/fetcher";
import useSWR from "swr";
import { Revenue } from "types/database";

export const useDashboardData = (fallbackData?: Revenue[]) => {
  const { user } = useUser();
  const key = user ? cacheKeys.dashboardData() : null;
  return useSWR<Revenue[], PostgrestError>(key, dashboardFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData,
  });
};