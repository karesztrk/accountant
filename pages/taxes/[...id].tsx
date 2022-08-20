import { showNotification } from "@mantine/notifications";
import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import Layout from "components/Layout";
import { loginPage, taxesPage } from "components/navbar/pages";
import TaxForm from "components/tax-form/TaxForm";
import { useTax } from "hooks/tax/use-tax";
import { useTaxMutation } from "hooks/tax/use-tax-mutation";
import { cacheKeys, tableNames } from "lib";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { Tax } from "types/database";

interface UpdateTaxProps {
  id?: string;
  fallbackData?: Tax;
}

const UpdateTax: NextPage<UpdateTaxProps> = ({ id, fallbackData }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data } = useTax(id, fallbackData);
  const { trigger } = useTaxMutation();

  const onSubmit = (values: Tax) => {
    if (id && values) {
      trigger(values)
        .then(() => {
          mutate(cacheKeys.taxes);
          router.push(taxesPage.href);
        })
        .catch((error: PostgrestError) => {
          showNotification({
            id: error.code,
            title: "Error",
            message: error.message,
            color: "red",
          });
        });
    }
  };

  return (
    <Layout size="xs" title="Edit tax">
      {data && <TaxForm tax={data} onSubmit={onSubmit} />}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: loginPage.href,
  async getServerSideProps(
    ctx: GetServerSidePropsContext<{ id?: string }>
  ): Promise<
    GetServerSidePropsResult<{
      id?: string;
      fallbackData?: Tax;
    }>
  > {
    const id = ctx.query.id;
    if (!id) {
      return { props: {} };
    }
    const { data } = await supabaseServerClient(ctx)
      .from(tableNames.tax)
      .select("*, transaction!inner(*)")
      .eq("id", id[0])
      .single();

    return {
      props: {
        id: id[0],
        fallbackData: data,
      },
    };
  },
});

export default UpdateTax;
