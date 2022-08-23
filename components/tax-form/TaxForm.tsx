import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useUser } from "@supabase/auth-helpers-react";
import CurrencyInput from "components/currency-input/CurrencyInput";
import { taxesPage } from "components/navbar/pages";
import NavigationButton from "components/navigation-button/NavigationButton";
import { FC, useState } from "react";
import { Tax as ClientTax } from "types/client";
import { toRemoteTax, toTax } from "./TaxForm.util";
import { Calendar } from "tabler-icons-react";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { useTaxMutation } from "hooks/tax/use-tax-mutation";
import { cacheKeys } from "lib";
import { showNotification } from "@mantine/notifications";
import { useTax } from "hooks/tax/use-tax";

const initialValues: ClientTax = {
  amount: 0,
  currency: "EUR",
  paid_on: new Date(),
};

const TaxForm: FC = () => {
  const { user } = useUser();

  const router = useRouter();

  const id = router.query.id;
  const { mutate } = useSWRConfig();
  console.log("🚀 ~ file: TaxForm.tsx ~ line 33 ~ id", id);
  const { data: tax } = useTax(id ? id[0] : undefined);
  const { trigger } = useTaxMutation();

  const [loading, setLoading] = useState(false);

  const form = useForm<ClientTax>({
    initialValues: tax ? toTax(tax) : initialValues,
  });

  const onSubmit = (values: ClientTax) => {
    if (!user) {
      return;
    }

    setLoading(true);
    const data = toRemoteTax(user.id, values, tax?.id);
    trigger(data)
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack spacing="md">
        <DatePicker
          icon={<Calendar size={16} />}
          placeholder="Payment date"
          label="Paid on"
          required
          {...form.getInputProps("paid_on")}
        />

        <CurrencyInput
          label="Amount"
          placeholder="1000"
          value={form.getInputProps("amount").value}
          currency={form.getInputProps("currency").value}
          onChange={form.getInputProps("amount").onChange}
          onCurrenyChange={form.getInputProps("currency").onChange}
          required
          expense
        />

        <TextInput
          label="Tax system"
          placeholder="General"
          {...form.getInputProps("system")}
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
  );
};

export default TaxForm;
