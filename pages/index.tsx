import { useUser } from "@supabase/auth-helpers-react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import SignIn from "../components/sign-in/SignIn";
import Dashboard from "../components/dashboard/Dashboard";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const { user } = useUser();

  return (
    <>
      <Head>
        <title>Accountant</title>
        <meta name="description" content="Accountant application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>{!user ? <SignIn /> : <Dashboard />}</Layout>
    </>
  );
};

export default Home;
