import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUser } from "@supabase/auth-helpers-react";
import NavigationButton from "components/navigation-button/NavigationButton";
import { FC } from "react";
import { Partner as ClientPartner } from "types/client";
import { Partner } from "types/database";

const initialValues: ClientPartner = {
  name: "",
  address: "",
  vat: "",
  email: "",
};

interface PartnerFormProps {
  partner?: Partner;
  onSubmit?: (values: Partial<Partner>) => void;
}

const PartnerForm: FC<PartnerFormProps> = ({
  partner,
  onSubmit: onSubmitProps,
}) => {
  const { user } = useUser();

  const form = useForm<ClientPartner>({
    initialValues: partner || initialValues,
  });

  const onSubmit = (values: ClientPartner) => {
    if (!user) {
      return;
    }
    const { name, address, vat, email } = values;

    const partner: Partial<Partner> = {
      name,
      address,
      vat,
      email,
    };

    if (onSubmitProps) {
      onSubmitProps(partner);
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
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </>
  );
};

export default PartnerForm;
