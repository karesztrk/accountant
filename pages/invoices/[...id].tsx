import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import InvoiceForm from "components/invoice-form/InvoiceForm";
import Layout from "components/Layout";
import { cacheKeys } from "lib";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { SWRConfig } from "swr";
import { Invoice } from "types/database";

interface UpdateInvoiceProps {
  data?: Invoice;
}

const UpdateInvoice: NextPage<UpdateInvoiceProps> = ({ data }) => {
  const fallback = data
    ? {
        [cacheKeys.invoice]: data,
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
      .from("invoice")
      .select()
      .eq("id", id)
      .single();

    return { props: { data } };
  },
});

export default UpdateInvoice;
