import {
  Button,
  Checkbox,
  Group,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useUser } from "@supabase/auth-helpers-react";
import CurrencyInput from "components/currency-input/CurrencyInput";
import NavigationButton from "components/navigation-button/NavigationButton";
import { FC, useMemo, useState } from "react";
import { Invoice as ClientInvoice } from "types/client";
import { Invoice, PartnerName } from "types/database";
import { toInvoice, toPartners, toRemoteInvoice } from "./InvoiceForm.util";

const initialValues: ClientInvoice = {
  partner_id: "0",
  amount: 0,
  issued_on: new Date(),
  invoice_number: "",
  currency: "EUR",
  paid: false,
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

  const [loading, setLoading] = useState(false);

  const form = useForm<ClientInvoice>({
    initialValues: invoice ? toInvoice(invoice) : initialValues,
  });

  const partnerData = useMemo(() => toPartners(partners), [partners]);

  const onSubmit = (values: ClientInvoice) => {
    console.log(
      "🚀 ~ file: InvoiceForm.tsx ~ line 55 ~ onSubmit ~ values",
      values
    );
    if (!user) {
      return;
    }

    if (onSubmitProps) {
      setLoading(true);
      onSubmitProps(toRemoteInvoice(values, invoice?.id));
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack spacing="md">
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
            placeholder="Pick date"
            label="Issued on"
            required
            {...form.getInputProps("issued_on")}
          />

          <Checkbox
            label="Paid"
            {...form.getInputProps("paid", { type: "checkbox" })}
          />

          <Group position="right" mt="md">
            <NavigationButton
              variant="outline"
              text="Cancel"
              href="/invoices"
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

export default InvoiceForm;
