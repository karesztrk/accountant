import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { loginPage } from "components/navbar/pages";
import { GetServerSideProps, NextPage } from "next";
import Dashboard from "../components/dashboard/Dashboard";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout title="Dashboard">
      <Dashboard />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: loginPage.href,
});

export default Home;
