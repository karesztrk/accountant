import { showNotification } from "@mantine/notifications";
import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import Layout from "components/Layout";
import PartnerTable from "components/partner-table/PartnerTable";
import { usePartnerDeletion } from "hooks/partner/use-partner-deletion";
import { usePartners } from "hooks/partner/use-partners";
import { tableNames } from "lib";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import { useEffect } from "react";
import { Partner } from "types/database";

interface PartnersProps {
  fallbackData: Partner[];
}

const Partners: NextPage<PartnersProps> = ({ fallbackData }) => {
  const { data = [], error, mutate } = usePartners(fallbackData);
  const { trigger } = usePartnerDeletion();

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
    <Layout title="Partners">
      {data && <PartnerTable partners={data} onDelete={onDelete} />}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: "/",
  async getServerSideProps(ctx): Promise<
    GetServerSidePropsResult<{
      fallbackData: Partner[];
    }>
  > {
    const { data } = await supabaseServerClient(ctx)
      .from<Partner>(tableNames.partner)
      .select("*");
    return { props: { fallbackData: data || [] } };
  },
});

export default Partners;
