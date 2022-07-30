import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUser } from "@supabase/auth-helpers-react";
import NavigationButton from "components/navigation-button/NavigationButton";
import { FC, useState } from "react";
import { Partner as ClientPartner } from "types/client";
import { Partner } from "types/database";
import { toRemotePartner } from "./PartnerForm.util";

const initialValues: ClientPartner = {
  name: "",
  address: "",
  vat: "",
  email: "",
};

interface PartnerFormProps {
  partner?: Partner;
  onSubmit?: (values: Partner) => void;
}

const PartnerForm: FC<PartnerFormProps> = ({
  partner,
  onSubmit: onSubmitProps,
}) => {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const form = useForm<ClientPartner>({
    initialValues: partner || initialValues,
  });

  const onSubmit = (values: ClientPartner) => {
    if (!user) {
      return;
    }

    if (onSubmitProps) {
      setLoading(true);
      onSubmitProps(toRemotePartner(user.id, values, partner?.id));
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(onSubmit)}>
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
      </form>
    </>
  );
};

export default PartnerForm;
