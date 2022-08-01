import { Button, Group, Select, Stack } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useUser } from "@supabase/auth-helpers-react";
import CurrencyInput from "components/currency-input/CurrencyInput";
import { paymentsPage } from "components/navbar/pages";
import NavigationButton from "components/navigation-button/NavigationButton";
import { FC, useState } from "react";
import { Payment as ClientPayment } from "types/client";
import { Payment } from "types/database";
import { toPayment, toRemotePayment } from "./PaymentForm.util";

const initialValues: ClientPayment = {
  amount: 0,
  currency: "EUR",
  paid_on: new Date(),
};

interface PaymentFormProps {
  payment?: Payment;
  onSubmit?: (values: Payment) => void;
}

const PaymentForm: FC<PaymentFormProps> = ({
  payment,
  onSubmit: onSubmitProps,
}) => {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const form = useForm<ClientPayment>({
    initialValues: payment ? toPayment(payment) : initialValues,
  });

  const onSubmit = (values: ClientPayment) => {
    if (!user) {
      return;
    }

    if (onSubmitProps) {
      setLoading(true);
      onSubmitProps(toRemotePayment(values, payment?.id));
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack spacing="md">
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
            data={[]}
            {...form.getInputProps("invoice_id")}
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
