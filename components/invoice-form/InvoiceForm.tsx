import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import CurrencyInput from "components/currency-input/CurrencyInput";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { FC, useMemo } from "react";
import { Invoice as ClientInvoice } from "types/client";
import useSWR, { useSWRConfig } from "swr";
import { cacheKeys, tableNames } from "lib";
import { Invoice } from "types/database";
import { useRouter } from "next/router";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";

const defaultValues: ClientInvoice = {
  partner_name: "",
  amount: 0,
  issued_on: new Date(),
  invoice_number: "",
  currency: "EUR",
  paid: false,
};

const fetcher = (id?: string) => async () => {
  const { data, error } = await supabaseClient
    .from(tableNames.invoice)
    .select()
    .eq("id", id)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const updateInvoice = async (id: string, invoice: Partial<Invoice>) => {
  const { error } = await supabaseClient
    .from("invoice")
    .update(invoice)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};

const InvoiceForm: FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const { id: idQuery } = router.query;
  const id = idQuery ? String(idQuery) : undefined;

  const { data, error } = useSWR<Invoice, Error>(
    id ? cacheKeys.invoice(id) : null
  );

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

  const onSubmit = (values: ClientInvoice) => {
    if (!user) {
      return;
    }
    const { invoice_number, amount, currency, issued_on, partner_name, paid } =
      values;

    const invoice: Partial<Invoice> = {
      invoice_number,
      amount,
      currency,
      issued_on: issued_on.toISOString(),
      partner_name,
      paid,
      user_id: user.id,
    };

    if (id) {
      updateInvoice(id, invoice);
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      mutate(cacheKeys.invoice(id), invoice);
      mutate(cacheKeys.invoices);
      router.push("/invoices");
    }
  };

  return (
    <>
      {error && <div>{error.message}</div>}
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
    </>
  );
};

export default InvoiceForm;
