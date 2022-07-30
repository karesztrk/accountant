import { Button, Checkbox, Group, Select, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useUser } from "@supabase/auth-helpers-react";
import CurrencyInput from "components/currency-input/CurrencyInput";
import NavigationButton from "components/navigation-button/NavigationButton";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { Invoice as ClientInvoice } from "types/client";
import { Invoice, PartnerName } from "types/database";

const initialValues: ClientInvoice = {
  partner_id: "0",
  amount: 0,
  issued_on: new Date(),
  invoice_number: "",
  currency: "EUR",
  paid: false,
};

const toInvoice = (invoice: Invoice): ClientInvoice => {
  return {
    ...invoice,
    issued_on: invoice?.issued_on ? new Date(invoice.issued_on) : new Date(),
    partner_id: String(invoice.partner_id),
  };
};

const toPartners = (partners: PartnerName[]) => {
  return partners.map((partner) => ({
    label: partner.name,
    value: String(partner.id),
  }));
};

interface InvoiceFormProps {
  invoice?: Invoice;
  partners: PartnerName[];
  onSubmit?: (values: Partial<Invoice>) => void;
}

const InvoiceForm: FC<InvoiceFormProps> = ({
  invoice,
  partners = [],
  onSubmit: onSubmitProps,
}) => {
  const { user } = useUser();
  const router = useRouter();

  const form = useForm<ClientInvoice>({
    initialValues: invoice ? toInvoice(invoice) : initialValues,
  });

  const partnerData = useMemo(() => toPartners(partners), [partners]);

  const onSubmit = (values: ClientInvoice) => {
    if (!user) {
      return;
    }
    const { invoice_number, amount, currency, issued_on, partner_id, paid } =
      values;

    const invoice: Partial<Invoice> = {
      invoice_number,
      amount,
      currency,
      issued_on: issued_on.toISOString(),
      partner_id: Number(partner_id),
      paid,
      user_id: user.id,
    };

    if (onSubmitProps) {
      onSubmitProps(invoice);
      router.push("/invoices");
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          required
          label="Invoice number"
          placeholder="INV-1"
          {...form.getInputProps("invoice_number")}
        />
        <Select
          required
          label="Partner"
          placeholder="Invoiced partner"
          searchable
          nothingFound="Not found"
          data={partnerData}
          mt="md"
          {...form.getInputProps("partner_id")}
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
          <NavigationButton variant="outline" text="Cancel" href="/invoices" />
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </>
  );
};

export default InvoiceForm;
