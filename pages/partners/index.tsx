import React, { useEffect } from "react";
import Layout from "components/Layout";
import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps } from "next";
import { tableNames } from "lib";
import { Partner } from "types/database";
import { usePartners } from "hooks/partner/use-partners";
import PartnerTable from "components/partner-table/PartnerTable";
import { showNotification } from "@mantine/notifications";

const Partners = () => {
  const { data = [], error } = usePartners();

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
      <PartnerTable partners={data} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: "/",
  async getServerSideProps(ctx) {
    const { data = [] } = await supabaseServerClient(ctx)
      .from<Partner[]>(tableNames.partner)
      .select("*");
    return { props: { fallbackData: data } };
  },
});

export default Partners;
