import { showNotification } from "@mantine/notifications";
import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import Layout from "components/Layout";
import { partnersPage } from "components/navbar/pages";
import PartnerForm from "components/partner-form/PartnerForm";
import { usePartner } from "hooks/partner/use-partner";
import { usePartnerMutation } from "hooks/partner/use-partner-mutation";
import { cacheKeys, tableNames } from "lib";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from "next";
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
  const { data } = usePartner(id, fallbackData);
  const { trigger } = usePartnerMutation();

  const onSubmit = (values: Partner) => {
    if (id && values) {
      trigger(values)
        .then(() => {
          mutate(cacheKeys.partners);
          router.push(partnersPage.href);
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
    <Layout size="xs" title="Edit partner">
      {data && <PartnerForm partner={data} onSubmit={onSubmit} />}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: "/",
  async getServerSideProps(
    ctx: GetServerSidePropsContext<{ id?: string }>
  ): Promise<
    GetServerSidePropsResult<{
      id?: string;
      fallbackData?: Partner;
    }>
  > {
    const id = ctx.query.id;
    if (!id) {
      return { props: {} };
    }
    const { data } = await supabaseServerClient(ctx)
      .from<Partner>(tableNames.partner)
      .select()
      .eq("id", id[0])
      .single();

    return { props: { id: id[0], fallbackData: data || undefined } };
  },
});

export default UpdatePartner;
