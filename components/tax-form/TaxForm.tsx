import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUser } from "@supabase/auth-helpers-react";
import CurrencyInput from "components/currency-input/CurrencyInput";
import { taxesPage } from "components/navbar/pages";
import NavigationButton from "components/navigation-button/NavigationButton";
import { FC, useState } from "react";
import { Tax } from "types/database";

const initialValues: Tax = {
  amount: 0,
  currency: "EUR",
};

interface TaxFormProps {
  tax?: Tax;
  onSubmit?: (values: Tax) => void;
}

const TaxForm: FC<TaxFormProps> = ({ tax, onSubmit: onSubmitProps }) => {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const form = useForm<Tax>({
    initialValues: tax ? tax : initialValues,
  });

  const onSubmit = (values: Tax) => {
    if (!user) {
      return;
    }

    if (onSubmitProps) {
      setLoading(true);
      onSubmitProps({
        ...values,
        id: tax?.id,
      });
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack spacing="md">
          <TextInput
            label="Tax"
            placeholder="General"
            {...form.getInputProps("type")}
          />

          <CurrencyInput
            label="Amount"
            placeholder="1000"
            value={form.getInputProps("amount").value}
            currency={form.getInputProps("currency").value}
            onChange={form.getInputProps("amount").onChange}
            onCurrenyChange={form.getInputProps("currency").onChange}
            required
          />

          <Textarea
            label="Description"
            placeholder="Monthly contractor tax"
            {...form.getInputProps("description")}
          />

          <Group position="right" mt="md">
            <NavigationButton
              variant="outline"
              text="Cancel"
              href={taxesPage.href}
            />
            <Button type="submit" loading={loading}>
              Submit
            </Button>
          </Group>
        </Stack>
      </form>
    </>
  );
};

export default TaxForm;
