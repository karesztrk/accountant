import { showNotification } from "@mantine/notifications";
import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import Layout from "components/Layout";
import PartnerForm from "components/partner-form/PartnerForm";
import { usePartner } from "hooks/partner/use-partner";
import { usePartnerMutation } from "hooks/partner/use-partner-mutation";
import { cacheKeys, tableNames } from "lib";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { Partner } from "types/database";

interface UpdatePartnerProps {
  id?: string;
  fallbackData?: Partner;
}

const UpdatePartner: NextPage<UpdatePartnerProps> = ({ id, fallbackData }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, error } = usePartner(id, fallbackData);
  const { trigger } = usePartnerMutation();

  const onSubmit = (values: Partial<Partner>) => {
    router.push("/partners");
    if (id && values) {
      trigger(id, values)
        .then(() => {
          mutate(cacheKeys.partners);
          router.push("/partners");
        })
        .catch((error: PostgrestError) => {
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
    <Layout size="xs" title="Edit invoice">
      <PartnerForm partner={data} onSubmit={onSubmit} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: "/",
  async getServerSideProps(ctx: GetServerSidePropsContext<{ id?: string }>) {
    const id = ctx.params?.id;
    if (!id) {
      return { props: { data: undefined } };
    }
    const { data } = await supabaseServerClient(ctx)
      .from(tableNames.partner)
      .select()
      .eq("id", id)
      .single();

    return { props: { id, fallbackData: data } };
  },
});

export default UpdatePartner;
