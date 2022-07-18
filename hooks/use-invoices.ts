import useSWRImmutable from "swr/immutable";

const fetcher = (url: string) =>
  fetch(url, { method: "GET" }).then((res) => res.json());

export const useInvoices = () => {
  return useSWRImmutable(() => "/api/invoice", fetcher);
};
