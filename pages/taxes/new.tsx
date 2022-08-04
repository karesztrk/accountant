import { showNotification } from "@mantine/notifications";
import Layout from "components/Layout";
import { taxesPage } from "components/navbar/pages";
import TaxForm from "components/tax-form/TaxForm";
import { useTaxMutation } from "hooks/tax/use-tax-mutation";
import { cacheKeys } from "lib";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { Tax } from "types/database";

const NewTax: NextPage = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { trigger } = useTaxMutation();

  const onSubmit = (values: Tax) => {
    if (values) {
      trigger(values)
        .then(() => {
          mutate(cacheKeys.taxes, undefined, {});
          router.push(taxesPage.href);
        })
        .catch((error) => {
          showNotification({
            id: error.code,
            title: "Error",
            message: error.message,
            color: "red",
          });
        });
    }
  };

  return (
    <Layout size="xs" title="New tax">
      <TaxForm onSubmit={onSubmit} />
    </Layout>
  );
};

export default NewTax;
