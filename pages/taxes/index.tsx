import { showNotification } from "@mantine/notifications";
import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import Layout from "components/Layout";
import TaxTable from "components/tax-table/TaxTable";
import { useTaxDeletion } from "hooks/tax/use-tax-deletion";
import { useTaxes } from "hooks/tax/use-taxes";
import { tableNames } from "lib";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import { useEffect } from "react";
import { Tax } from "types/database";

interface TaxesProps {
  fallbackData: Tax[];
}

const Taxes: NextPage<TaxesProps> = ({ fallbackData }) => {
  const { data = [], error, mutate } = useTaxes(fallbackData);
  const { trigger } = useTaxDeletion();

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
    <Layout title="Taxes">
      {data && <TaxTable taxes={data} onDelete={onDelete} />}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: "/",
  async getServerSideProps(ctx): Promise<
    GetServerSidePropsResult<{
      fallbackData: Tax[];
    }>
  > {
    const { data } = await supabaseServerClient(ctx)
      .from<Tax>(tableNames.tax)
      .select("*");

    return { props: { fallbackData: data || [] } };
  },
});

export default Taxes;
