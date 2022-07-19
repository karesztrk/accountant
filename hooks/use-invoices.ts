import useSWR from "swr";

export const path = "/api/invoice";

const fetcher = (url: string) =>
  fetch(url, { method: "GET" }).then((res) => res.json());

export const useInvoices = () => {
  return useSWR(path, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
