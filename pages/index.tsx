import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import IncomeChart from "components/income-chart/IncomeChart";
import { loginPage } from "components/navbar/pages";
import { useDashboardData } from "hooks/dashboard/use-dashboard-data";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import { Expense, Income } from "types/database";
import { Database } from "types/database/gen";
import Layout from "../components/Layout";
import Stats from "../components/stats/Stats";

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

export const getServerSideProps: GetServerSideProps = withPageAuth<Database>({
  redirectTo: loginPage.href,
  async getServerSideProps(
    _ctx,
    supabase
  ): Promise<
    GetServerSidePropsResult<{
      income: Income[];
      expense: Expense[];
    }>
  > {
    const { data: income } = await supabase
      .from("income_per_month")
      .select("*");
    const { data: expense } = await supabase
      .from("expense_per_month")
      .select("*");

    return { props: { income: income || [], expense: expense || [] } };
  },
});

export default Home;
