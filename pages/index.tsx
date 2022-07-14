import { Session } from "@supabase/supabase-js";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Auth from "../components/Auth";
import { supabase } from "../utils/supabaseClient";

const Home: NextPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <>
      <Head>
        <title>Accountant</title>
        <meta name="description" content="Accountant application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>{!session && <Auth />}</Layout>
    </>
  );
};

export default Home;
