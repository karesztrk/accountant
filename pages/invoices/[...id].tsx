import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import InvoiceForm from "components/invoice-form/InvoiceForm";
import Layout from "components/Layout";
import { loginPage } from "components/navbar/pages";
import { cacheKeys, tableNames } from "lib";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import { SWRConfig, unstable_serialize } from "swr";
import { Invoice, Partner } from "types/database";

interface UpdateInvoiceProps {
  fallback: Record<string, unknown>;
}

const UpdateInvoice: NextPage<UpdateInvoiceProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Layout size="xs" title="Edit invoice">
        <InvoiceForm />
      </Layout>
    </SWRConfig>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: loginPage.href,
  async getServerSideProps(
    ctx: GetServerSidePropsContext<{ id?: string }>
  ): Promise<
    GetServerSidePropsResult<{
      fallback: Record<string, unknown>;
    }>
  > {
    const id = ctx.query.id;
    if (!id) {
      return { props: { fallback: {} } };
    }

    const { data } = await supabaseServerClient(ctx)
      .from<Invoice>(tableNames.invoice)
      .select()
      .eq("id", id[0])
      .single();

    const { data: partners } = await supabaseServerClient(ctx)
      .from<Partner>(tableNames.partner)
      .select("*");

    return {
      props: {
        fallback: {
          [unstable_serialize(cacheKeys.invoice(id[0]))]: data || undefined,
          [unstable_serialize(cacheKeys.partners)]: partners || [],
        },
      },
    };
  },
});

export default UpdateInvoice;
