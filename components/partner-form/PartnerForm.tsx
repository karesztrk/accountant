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

const defaultValues: ClientPartner = {
  name: "",
  address: "",
  vat: "",
  email: "",
};

const validate = {
  email: (value: string) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
};

interface PartnerFormProps {
  onClose?: () => void;
}

const PartnerForm: FC<PartnerFormProps> = ({ onClose: onCloseProp }) => {
  const user = useUser();

  const router = useRouter();

  const { mutate } = useSWRConfig();

  const id = router.query.id;
  const { data: partner } = usePartner(id ? id[0] : undefined);
  const { trigger } = usePartnerMutation();

  const [loading, setLoading] = useState(false);

  const initialValues = partner
    ? { ...partner, email: partner.email || undefined }
    : defaultValues;
  const form = useForm<ClientPartner>({
    initialValues,
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

  const onClose = () => {
    router
      .push(
        {
          pathname: partnersPage.href,
        },
        undefined,
        { shallow: true }
      )
      .then(() => {
        if (onCloseProp) {
          onCloseProp();
        }
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
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default PartnerForm;
