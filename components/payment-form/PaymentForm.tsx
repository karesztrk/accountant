import {
  Button,
  Group,
  SegmentedControl,
  Select,
  Stack,
  Transition,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useUser } from "@supabase/auth-helpers-react";
import CurrencyInput from "components/currency-input/CurrencyInput";
import DetailedSelectItem from "components/detailed-select-item/SelectItem";
import { paymentsPage } from "components/navbar/pages";
import useFinance from "hooks/finance/use-finance";
import { useInvoices } from "hooks/invoice/use-invoices";
import { usePartners } from "hooks/partner/use-partners";
import { usePayment } from "hooks/payment/use-payment";
import { usePaymentMutation } from "hooks/payment/use-payment-mutation";
import { cacheKeys } from "lib";
import { useRouter } from "next/router";
import { FC, useMemo, useState } from "react";
import { mutate } from "swr";
import { Calendar } from "tabler-icons-react";
import { Payment as ClientPayment } from "types/client";
import { PaymentType } from "types/database";
import {
  toInvoiceOptions,
  toPartnerOptions,
  toPayment,
  toRemotePayment,
} from "./PaymentForm.util";

const initialValues: ClientPayment = {
  amount: 0,
  currency: "EUR",
  received_on: new Date(),
  local_amount: 0,
  local_currency: "HUF",
  type: "simple",
};

const paymentTypeOptions: { label: string; value: PaymentType }[] = [
  { label: "Simple payment", value: "simple" },
  { label: "Foreign payment", value: "foreign" },
];

const PaymentForm: FC = () => {
  const user = useUser();

  const router = useRouter();

  const { mutate: mutateFinanceState } = useFinance();
  const { data: payment } = usePayment(router.query.id as string | undefined);
  const { trigger } = usePaymentMutation();
  const { data: partners = [] } = usePartners();

  const [loading, setLoading] = useState(false);

  const form = useForm<ClientPayment>({
    initialValues: payment ? toPayment(payment) : initialValues,
  });

  const { data: invoices = [] } = useInvoices({
    partner_id: form.values.partner_id || "",
  });

  const invoiceOptions = useMemo(() => toInvoiceOptions(invoices), [invoices]);

  const partnerOptions = useMemo(() => toPartnerOptions(partners), [partners]);

  const onSubmit = (values: ClientPayment) => {
    if (!user) {
      return;
    }

    setLoading(true);
    const data = toRemotePayment(user.id, values, payment?.id);
    trigger(data)
      .then(() => {
        mutate(cacheKeys.payments, undefined, {});
        router.push(paymentsPage.href);
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

  const { onChange, ...invoiceInputProps } = form.getInputProps("invoice_id");

  const onInvoiceChange = (id: string) => {
    onChange(id);
    const invoice = invoices.find(
      (invoice) => invoice.id && String(invoice.id) === id,
    );
    if (invoice) {
      form.setFieldValue("amount", invoice.amount);
      form.setFieldValue("currency", invoice.currency);
    }
  };

  const onClose = () => {
    router
      .push(
        {
          pathname: paymentsPage.href,
        },
        undefined,
        { shallow: true },
      )
      .then(() => {
        mutateFinanceState({ opened: false });
      });
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack spacing="md">
        <SegmentedControl
          color="brand"
          {...form.getInputProps("type")}
          data={paymentTypeOptions}
        />
        <Select
          required
          label="Partner"
          placeholder="Received from"
          searchable
          nothingFound="Not found"
          data={partnerOptions}
          {...form.getInputProps("partner_id")}
        />

        <Select
          label="Invoice"
          placeholder="Related invoice"
          searchable
          nothingFound="Not found"
          data={invoiceOptions}
          itemComponent={DetailedSelectItem}
          onChange={onInvoiceChange}
          {...invoiceInputProps}
        />

        <CurrencyInput
          label="Price"
          placeholder="1000"
          value={form.getInputProps("amount").value}
          currency={form.getInputProps("currency").value}
          onChange={form.getInputProps("amount").onChange}
          onCurrenyChange={form.getInputProps("currency").onChange}
          required
        />

        <Transition
          mounted={form.values.type === "foreign"}
          transition="fade"
          duration={400}
          timingFunction="ease-in-out"
        >
          {(styles) => (
            <CurrencyInput
              style={styles}
              label="Local price"
              placeholder="2000"
              value={form.getInputProps("local_amount").value}
              currency={form.getInputProps("local_currency").value}
              onChange={form.getInputProps("local_amount").onChange}
              onCurrenyChange={form.getInputProps("local_currency").onChange}
            />
          )}
        </Transition>

        <DatePicker
          icon={<Calendar size={16} />}
          placeholder="Received date"
          label="Received on"
          required
          {...form.getInputProps("received_on")}
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

export default PaymentForm;
