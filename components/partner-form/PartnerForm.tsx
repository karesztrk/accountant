import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useUser } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { partnersPage } from "components/navbar/pages";
import NavigationButton from "components/navigation-button/NavigationButton";
import { usePartner } from "hooks/partner/use-partner";
import { usePartnerMutation } from "hooks/partner/use-partner-mutation";
import { cacheKeys } from "lib";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useSWRConfig } from "swr";
import { Partner as ClientPartner } from "types/client";
import { toRemotePartner } from "./PartnerForm.util";

const initialValues: ClientPartner = {
  name: "",
  address: "",
  vat: "",
  email: "",
};

const validate = {
  email: (value: string) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
};

const PartnerForm: FC = () => {
  const { user } = useUser();

  const router = useRouter();

  const { mutate } = useSWRConfig();

  const id = router.query.id;
  const { data: partner } = usePartner(id ? id[0] : undefined);
  const { trigger } = usePartnerMutation();

  const [loading, setLoading] = useState(false);

  const form = useForm<ClientPartner>({
    initialValues: partner || initialValues,
    validate,
  });

  const onSubmit = (values: ClientPartner) => {
    if (!user) {
      return;
    }

    setLoading(true);
    const data = toRemotePartner(user.id, values, partner?.id);
    trigger(data)
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack spacing="md">
        <TextInput
          required
          label="Name"
          placeholder="Acme Inc."
          {...form.getInputProps("name")}
        />

        <TextInput
          required
          label="Address"
          placeholder="Postal address"
          {...form.getInputProps("address")}
        />

        <TextInput
          required
          label="VAT"
          placeholder="VAT number"
          {...form.getInputProps("vat")}
        />

        <TextInput
          required
          label="Email address"
          placeholder="acme@inc.com"
          {...form.getInputProps("email")}
        />

        <Group position="right" mt="md">
          <NavigationButton variant="outline" text="Cancel" href="/partners" />
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default PartnerForm;
