import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useInvoices } from "hooks/use-invoices";
import type { NextPage } from "next";
import InvoiceTable from "components/invoice-table/InvoiceTable";
import Layout from "components/Layout";
import NavigationButton from "components/navigation-button/NavigationButton";
import { Group } from "@mantine/core";

const Invoices: NextPage = () => {
  const { data = [] } = useInvoices();

  return (
    <Layout>
      <Group position="right">
        <NavigationButton href="/invoices/new" text="New" />
      </Group>
      <InvoiceTable invoices={data} />
    </Layout>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/",
});

export default Invoices;
