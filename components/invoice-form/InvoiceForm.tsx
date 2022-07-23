import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import CurrencyInput from "components/currency-input/CurrencyInput";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { FC, useMemo } from "react";
import { Invoice as ClientInvoice } from "types/client";
import useSWR from "swr";
import { cacheKeys } from "lib";
import { Invoice } from "types/database";

const defaultValues: ClientInvoice = {
  partner_name: "",
  amount: 0,
  issued_on: new Date(),
  currency: "",
  invoice_number: "",
  paid: false,
};

const InvoiceForm: FC = () => {
  const { data, error } = useSWR<Invoice>(cacheKeys.invoice);
  const initialValues: ClientInvoice = useMemo(
    () =>
      data
        ? {
            ...data,
            issued_on: data?.issued_on ? new Date(data.issued_on) : new Date(),
          }
        : defaultValues,
    [data]
  );

  const form = useForm<ClientInvoice>({ initialValues });

  const onSubmit = (values: ClientInvoice) => console.log(values);

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        required
        label="Invoice number"
        placeholder="INV-1"
        {...form.getInputProps("invoice_number")}
      />
      <TextInput
        required
        label="Partner"
        placeholder="Company name"
        mt="md"
        {...form.getInputProps("partner_name")}
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
      <DatePicker
        mt="md"
        placeholder="Pick date"
        label="Issued on"
        required
        {...form.getInputProps("issued_on")}
      />

      <Checkbox
        mt="md"
        label="Paid"
        {...form.getInputProps("paid", { type: "checkbox" })}
      />

      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};

export default InvoiceForm;
