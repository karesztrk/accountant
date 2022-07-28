import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import InvoiceTable from "components/invoice-table/InvoiceTable";
import Layout from "components/Layout";
import { useInvoices } from "hooks/use-invoices";
import { tableNames } from "lib";
import type { GetServerSideProps, NextPage } from "next";
import { Invoice } from "types/database";

interface InvoicesProps {
  fallbackData: Invoice[];
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
  async getServerSideProps(ctx) {
    const { data = [] } = await supabaseServerClient(ctx)
      .from<Invoice[]>(tableNames.invoice)
      .select("*");
    console.log(
      "🚀 ~ file: index.tsx ~ line 31 ~ getServerSideProps ~ data",
      data
    );
    return { props: { fallbackData: data } };
  },
});

export default Invoices;
