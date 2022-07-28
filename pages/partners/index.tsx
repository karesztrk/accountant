import React from "react";
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

const Partners = () => {
  const { data = [], error } = usePartners();

  return (
    <Layout title="Partners">
      {error && <div>{error.message}</div>}
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
