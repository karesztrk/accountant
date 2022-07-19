import { useSWRConfig } from "swr";
import { path } from "./use-invoices";

export const useInvoiceMutation = () => {
  const { mutate } = useSWRConfig();

  const fetcher = (values: unknown) =>
    fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then(() => {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      mutate(path);
    });

  return {
    fetcher,
  };
};
