import { Table } from "@mantine/core";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import {
  User,
  withPageAuth,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";

const Income: NextPage = () => {
  return (
    <>
      <Layout>
        <Table>
          <thead>
            <tr>
              <th>Element position</th>
              <th>Element name</th>
              <th>Symbol</th>
              <th>Atomic mass</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>content</td>
            </tr>
          </tbody>
        </Table>
      </Layout>
    </>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/",
});

export default Income;
