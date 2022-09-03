import React from "react";
import SignIn from "components/sign-in/SignIn";
import Layout from "components/Layout";
import { GetServerSideProps } from "next";
import { getUser } from "@supabase/auth-helpers-nextjs";

const Login = () => {
  return (
    <Layout>
      <SignIn />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user } = await getUser(ctx);

  return user
    ? {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
    : {
        props: {},
      };
};

export default Login;
