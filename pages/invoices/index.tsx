import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import InvoiceTable from "components/invoice-table/InvoiceTable";
import Layout from "components/Layout";
import { useInvoices } from "hooks/invoice/use-invoices";
import { tableNames } from "lib";
import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import { Invoice, InvoiceWithPartner } from "types/database";

interface InvoicesProps {
  fallbackData: InvoiceWithPartner[];
}

const Invoices: NextPage<InvoicesProps> = ({ fallbackData }) => {
  const { data = [], error } = useInvoices(fallbackData);

  return (
    <Layout title="Invoices">
      {error && <div>{error.message}</div>}
      <InvoiceTable invoices={data} />
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
