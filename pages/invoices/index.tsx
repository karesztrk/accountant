import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps, NextPage } from "next";
import InvoiceTable from "components/invoice-table/InvoiceTable";
import Layout from "components/Layout";
import NavigationButton from "components/navigation-button/NavigationButton";
import { Group } from "@mantine/core";
import { Invoice } from "types/database";
import { SWRConfig } from "swr";
import { cacheKeys } from "lib";

interface InvoicesProps {
  data: Invoice[];
}

const Invoices: NextPage<InvoicesProps> = ({ data }) => {
  const fallback = {
    [cacheKeys.invoices]: data,
  };

  return (
    <SWRConfig value={{ fallback }}>
      <Layout>
        <Group position="right">
          <NavigationButton href="/invoices/new" text="New" />
        </Group>
        <InvoiceTable />
      </Layout>
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: "/",
  async getServerSideProps(ctx) {
    const { data = [] } = await supabaseServerClient(ctx)
      .from<Invoice[]>("invoice")
      .select("*");
    return { props: { data } };
  },
});

export default Invoices;
