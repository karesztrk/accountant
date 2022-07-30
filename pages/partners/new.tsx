import { showNotification } from "@mantine/notifications";
import Layout from "components/Layout";
import PartnerForm from "components/partner-form/PartnerForm";
import { usePartnerMutation } from "hooks/partner/use-partner-mutation";
import { cacheKeys } from "lib";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { Partner } from "types/database";

const NewPartner = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { trigger } = usePartnerMutation();

  const onSubmit = (values: Partner) => {
    if (values) {
      trigger(values)
        .then(() => {
          mutate(cacheKeys.partners, undefined, {});
          router.push("/partners");
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
    <Layout size="xs" title="New partner">
      <PartnerForm onSubmit={onSubmit} />
    </Layout>
  );
};

export default NewPartner;
