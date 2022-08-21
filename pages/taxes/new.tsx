import Layout from "components/Layout";
import TaxForm from "components/tax-form/TaxForm";
import { NextPage } from "next";

const NewTax: NextPage = () => {
  return (
    <Layout size="xs" title="New tax">
      <TaxForm />
    </Layout>
  );
};

export default NewTax;
