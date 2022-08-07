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
import { useUser } from "@supabase/auth-helpers-react";
import CurrencyInput from "components/currency-input/CurrencyInput";
import { paymentsPage } from "components/navbar/pages";
import NavigationButton from "components/navigation-button/NavigationButton";
import DetailedSelectItem from "components/detailed-select-item/SelectItem";
import { FC, useEffect, useMemo, useState } from "react";
import { Calendar } from "tabler-icons-react";
import { Payment as ClientPayment } from "types/client";
import { InvoiceWithPartner, Payment, PaymentType } from "types/database";
import { toInvoices, toPayment, toRemotePayment } from "./PaymentForm.util";

const initialValues: ClientPayment = {
  amount: 0,
  currency: "EUR",
  paid_on: new Date(),
  local_amount: 0,
  local_currency: "HUF",
  type: "simple",
};

interface PaymentFormProps {
  payment?: Payment;
  onSubmit?: (values: Payment) => void;
  invoices: InvoiceWithPartner[];
}

const paymentTypeOptions: { label: string; value: PaymentType }[] = [
  { label: "Simple payment", value: "simple" },
  { label: "Foreign payment", value: "foreign" },
];

const PaymentForm: FC<PaymentFormProps> = ({
  payment,
  onSubmit: onSubmitProp,
  invoices: invoicesProp,
}) => {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const form = useForm<ClientPayment>({
    initialValues: payment ? toPayment(payment) : initialValues,
  });

  const invoices = useMemo(() => toInvoices(invoicesProp), [invoicesProp]);

  const onSubmit = (values: ClientPayment) => {
    if (!user) {
      return;
    }

    if (onSubmitProp) {
      setLoading(true);
      onSubmitProp(toRemotePayment(values, payment?.id));
    }
  };

  const { onChange, ...invoiceInputProps } = form.getInputProps("invoice_id");

  const onInvoiceChange = (id: string) => {
    onChange(id);
    const invoice = invoicesProp.find(
      (invoice) => invoice.id && String(invoice.id) === id
    );
    if (invoice) {
      console.log(invoice);
      form.setFieldValue("amount", invoice.amount);
      form.setFieldValue("currency", invoice.currency);
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack spacing="md">
          <SegmentedControl
            color="brand"
            {...form.getInputProps("type")}
            data={paymentTypeOptions}
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
            placeholder="Payment date"
            label="Paid on"
            required
            {...form.getInputProps("paid_on")}
          />

          <Select
            label="Invoice"
            placeholder="Related invoice"
            searchable
            nothingFound="Not found"
            data={invoices}
            itemComponent={DetailedSelectItem}
            onChange={onInvoiceChange}
            {...invoiceInputProps}
          />

          <Group position="right" mt="md">
            <NavigationButton
              variant="outline"
              text="Cancel"
              href={paymentsPage.href}
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

export default PaymentForm;
