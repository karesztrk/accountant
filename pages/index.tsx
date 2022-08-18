import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { loginPage } from "components/navbar/pages";
import { useDashboardData } from "hooks/dashboard/use-dashboard-data";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import { Revenue } from "types/database";
import Dashboard from "../components/dashboard/Dashboard";
import Layout from "../components/Layout";

interface HomeProps {
  revenue: Revenue[];
}

const Home: NextPage<HomeProps> = ({ revenue }) => {
  const { data = [] } = useDashboardData(revenue);
  return (
    <Layout title="Dashboard">
      <Dashboard revenue={data} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: loginPage.href,
  async getServerSideProps(ctx): Promise<
    GetServerSidePropsResult<{
      revenue: Revenue[];
    }>
  > {
    const { data } = await supabaseServerClient(ctx)
      .from<Revenue>("revenue_per_month")
      .select("*");

    return { props: { revenue: data || [] } };
  },
});

export default Home;
