import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import IncomeChart from "components/income-chart/IncomeChart";
import { loginPage } from "components/navbar/pages";
import { useDashboardData } from "hooks/dashboard/use-dashboard-data";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import { Expense, Income } from "types/database";
import Stats from "../components/stats/Stats";
import Layout from "../components/Layout";

interface HomeProps {
  income: Income[];
  expense: Expense[];
}

const Home: NextPage<HomeProps> = ({ income, expense }) => {
  const { data } = useDashboardData({ income, expense });

  return (
    <Layout title="Dashboard">
      {data && (
        <>
          <Stats data={data} />
          <IncomeChart data={data} />
        </>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: loginPage.href,
  async getServerSideProps(ctx): Promise<
    GetServerSidePropsResult<{
      income: Income[];
      expense: Expense[];
    }>
  > {
    const { data: income } = await supabaseServerClient(ctx)
      .from<Income>("income_per_month")
      .select("*");
    const { data: expense } = await supabaseServerClient(ctx)
      .from<Expense>("expense_per_month")
      .select("*");

    return { props: { income: income || [], expense: expense || [] } };
  },
});

export default Home;
