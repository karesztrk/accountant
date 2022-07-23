import useSWR from "swr";
import { Invoice } from "types/database";

export const path = "/api/invoice";

const fetcher = (url: string) =>
  fetch(url, { method: "GET" }).then((res) => res.json());

export const useInvoices = (id?: number) => {
  let key = path;
  if (id) {
    key = `${key}/${id}`;
  }
  return useSWR<Invoice[]>(key, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
