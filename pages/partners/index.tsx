import React, { useEffect } from "react";
import Layout from "components/Layout";
import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import { cacheKeys, tableNames } from "lib";
import { Partner } from "types/database";
import { usePartners } from "hooks/partner/use-partners";
import PartnerTable from "components/partner-table/PartnerTable";
import { showNotification } from "@mantine/notifications";
import { usePartnerDeletion } from "hooks/partner/use-partner-deletion";
import { useSWRConfig } from "swr";

interface PartnersProps {
  fallbackData: Partner[];
}

const Partners: NextPage<PartnersProps> = ({ fallbackData }) => {
  const { mutate } = useSWRConfig();
  const { data = [], error } = usePartners(fallbackData);
  const { trigger } = usePartnerDeletion();

  const onDelete = (ids: number[]) => {
    trigger(ids)
      .then(() => {
        mutate(cacheKeys.partners);
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
