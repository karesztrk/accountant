import Layout from "components/Layout";
import PartnerForm from "components/partner-form/PartnerForm";
import { usePartnerMutation } from "hooks/partner/use-partner-mutation";
import { cacheKeys } from "lib";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { Invoice as Partner } from "types/database";

const NewPartner = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { trigger } = usePartnerMutation();

  const onSubmit = (values: Partial<Partner>) => {
    if (values) {
      trigger(undefined, values)
        .then(() => {
          mutate(cacheKeys.partners, undefined, {});
          router.push("/partners");
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <Layout size="xs" title="New partner">
      <PartnerForm onSubmit={onSubmit} />
    </Layout>
  );
};

export default NewPartner;
