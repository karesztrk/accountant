import {
  supabaseClient,
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import InvoiceForm from "components/invoice-form/InvoiceForm";
import Layout from "components/Layout";
import { cacheKeys, tableNames } from "lib";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { SWRConfig } from "swr";
import { Invoice } from "types/database";

interface UpdateInvoiceProps {
  id?: string;
  data?: Invoice;
}

const UpdateInvoice: NextPage<UpdateInvoiceProps> = ({ id, data }) => {
  const fallback = data
    ? {
        [cacheKeys.invoice(id)]: data,
      }
    : {};

  return (
    <SWRConfig value={{ fallback }}>
      <Layout size="xs">
        <InvoiceForm />
      </Layout>
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: "/",
  async getServerSideProps(ctx: GetServerSidePropsContext<{ id?: string }>) {
    const id = ctx.params?.id;
    if (!id) {
      return { props: { data: undefined } };
    }
    const { data } = await supabaseServerClient(ctx)
      .from(tableNames.invoice)
      .select()
      .eq("id", id)
      .single();

    return { props: { id, data } };
  },
});

export default UpdateInvoice;
