import { showNotification } from "@mantine/notifications";
import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import InvoiceTable from "components/invoice-table/InvoiceTable";
import Layout from "components/Layout";
import { useInvoiceDeletion } from "hooks/invoice/use-invoice-deletion";
import { useInvoices } from "hooks/invoice/use-invoices";
import { tableNames } from "lib";
import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import { useEffect } from "react";
import { InvoiceWithPartner } from "types/database";

interface InvoicesProps {
  fallbackData: InvoiceWithPartner[];
}

const Invoices: NextPage<InvoicesProps> = ({ fallbackData }) => {
  const { data = [], error, mutate } = useInvoices(fallbackData);
  const { trigger } = useInvoiceDeletion();

  const onDelete = (ids: number[]) => {
    trigger(ids)
      .then(() => {
        mutate();
      })
      .catch((error) => {
        showNotification({
          id: error.code,
          title: "Error",
          message: error.message,
          color: "red",
        });
      });
  };

  useEffect(() => {
    if (error) {
      showNotification({
        id: error.code,
        title: "Error",
        message: error.message,
        color: "red",
      });
    }
  }, [error]);

  return (
    <Layout title="Invoices">
      {data && <InvoiceTable invoices={data} onDelete={onDelete} />}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: "/",
  async getServerSideProps(ctx): Promise<
    GetServerSidePropsResult<{
      fallbackData: InvoiceWithPartner[];
    }>
  > {
    const { data } = await supabaseServerClient(ctx)
      .from<InvoiceWithPartner>(tableNames.invoice)
      .select(`*, partner!inner(name)`);

    return { props: { fallbackData: data || [] } };
  },
});

export default Invoices;
