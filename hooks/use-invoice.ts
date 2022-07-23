import useSWR from "swr";
import { Invoice } from "types/database";

export const path = "/api/invoice";

const fetcher = (url: string) =>
  fetch(url, { method: "GET" }).then((res) => res.json());

export const useInvoice = (id?: string) => {
  return useSWR<Invoice>(id ? `${path}/${id}` : null, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
