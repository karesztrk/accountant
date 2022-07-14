import { Table } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";

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
          <tbody>content</tbody>
        </Table>
      </Layout>
    </>
  );
};

export default Income;
