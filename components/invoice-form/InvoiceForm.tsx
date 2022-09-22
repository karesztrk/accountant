import { Button, Group, Select, Stack, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useUser } from "@supabase/auth-helpers-react";
import CurrencyInput from "components/currency-input/CurrencyInput";
import { invoicesPage } from "components/navbar/pages";
import useFinance from "hooks/finance/use-finance";
import { useInvoice } from "hooks/invoice/use-invoice";
import { useInvoiceMutation } from "hooks/invoice/use-invoice-mutation";
import { usePartners } from "hooks/partner/use-partners";
import { cacheKeys } from "lib";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { Calendar } from "tabler-icons-react";
import { Invoice as ClientInvoice } from "types/client";
import { toInvoice, toPartners, toRemoteInvoice } from "./InvoiceForm.util";
import { mutate } from "swr";

const initialValues: ClientInvoice = {
  partner_id: "0",
  amount: 0,
  issued_on: new Date(),
  invoice_number: "",
  currency: "EUR",
};

const InvoiceForm = () => {
  const { user } = useUser();

  const router = useRouter();

  const { mutate: mutateFinanceState } = useFinance();

  const { data: invoice } = useInvoice(router.query.id as string | undefined);
  const { data: partners = [] } = usePartners();

  const { trigger } = useInvoiceMutation();

  const [loading, setLoading] = useState(false);

  const form = useForm<ClientInvoice>({
    initialValues: invoice ? toInvoice(invoice) : initialValues,
  });

  const partnerData = useMemo(() => toPartners(partners), [partners]);

  const onSubmit = (values: ClientInvoice) => {
    if (!user) {
      return;
    }

    setLoading(true);
    const data = toRemoteInvoice(values, invoice?.id);
    trigger(data)
      .then(() => {
        mutate(cacheKeys.invoices());
      })
      .catch((error) => {
        showNotification({
          id: error.code,
          title: "Error",
          message: error.message,
          color: "red",
        });
      })
      .finally(onClose);
  };

  const onClose = () => {
    router
      .push(
        {
          pathname: invoicesPage.href,
        },
        undefined,
        { shallow: true }
      )
      .then(() => {
        mutateFinanceState({ opened: false });
      });
  };

  return (
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
          icon={<Calendar size={16} />}
          placeholder="Pick date"
          label="Issued on"
          required
          {...form.getInputProps("issued_on")}
        />

        <TextInput
          label="URL"
          placeholder="Your downloadable invoice link"
          type="url"
          {...form.getInputProps("url")}
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

export default InvoiceForm;
