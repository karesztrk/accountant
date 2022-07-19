import Layout from "components/Layout";
import { useForm } from "@mantine/form";
import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import CurrencyInput from "components/currency-input/CurrencyInput";
import { DatePicker } from "@mantine/dates";
import { useInvoiceMutation } from "hooks/use-invoice-mutation";
import { useRouter } from "next/router";

const NewInvoice = () => {
  const { push } = useRouter();
  const { fetcher } = useInvoiceMutation();

  const form = useForm({
    initialValues: {
      invoice_number: "",
      partner_name: "",
      amount: 0,
      issued_on: new Date(),
      currency: "EUR",
      paid: false,
    },
  });

  const onSubmit = (values: typeof form.values) => {
    fetcher(values)
      .then(() => {
        push("/invoices");
      })
      .catch(console.error);
  };

  return (
    <Layout size="xs">
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
    </Layout>
  );
};

export default NewInvoice;
