import {
  Button,
  Checkbox,
  Group,
  Stack,
  Table,
  Transition,
} from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { newPaymentPage } from "components/navbar/pages";
import NavigationButton from "components/navigation-button/NavigationButton";
import { useRouter } from "next/router";
import React, { ChangeEvent, FC, MouseEvent } from "react";
import { Payment } from "types/database";
import { useStyles } from "./PaymentTable.styles";

interface PaymentTableProps {
  payments: Payment[];
  onDelete?: (ids: number[]) => void;
}

const PaymentTable: FC<PaymentTableProps> = ({
  payments,
  onDelete: onDeleteProp,
}) => {
  const router = useRouter();
  const [selection, handlers] = useListState<number>([]);

  const { classes } = useStyles();

  const allChecked =
    payments.length > 0 && selection.length === payments.length;

  const indeterminate =
    selection.length > 0 && selection.length !== payments.length;

  const onRowClick =
    (payment: Payment) => (e: MouseEvent<HTMLTableRowElement>) => {
      if (!(e.target instanceof HTMLInputElement) && payment.id) {
        router.push(`/payments/${payment.id}`);
      }
    };

  const onToggleRow =
    (payment: Payment) => (e: ChangeEvent<HTMLInputElement>) => {
      if (!payment.id) {
        return;
      }
      if (e.target.checked) {
        handlers.append(payment.id);
      } else {
        handlers.filter((item) => item !== payment.id);
      }
    };

  const onToggleAll = () => {
    if (allChecked) {
      handlers.setState([]);
    } else {
      handlers.setState(payments.map((item) => item.id || 0).filter(Boolean));
    }
  };

  const onDelete = () => {
    if (onDeleteProp && selection.length > 0) {
      onDeleteProp(selection);
      handlers.filter((item) => !selection.includes(item));
    }
  };

  const isChecked = (item: Payment) => !!item.id && selection.includes(item.id);

  return (
    <Stack>
      <Group position="right">
        <Transition
          mounted={selection.length > 0}
          transition="fade"
          duration={250}
          timingFunction="ease"
        >
          {(styles) => (
            <Button
              color="red"
              variant="light"
              onClick={onDelete}
              style={styles}
            >
              Delete
            </Button>
          )}
        </Transition>
        <NavigationButton href={newPaymentPage.href} text="New" />
      </Group>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>
              <Checkbox
                onChange={onToggleAll}
                checked={allChecked}
                indeterminate={indeterminate}
              />
            </th>
            <th>Price</th>
            <th>Related invoice</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) =>
            payment.id ? (
              <tr
                key={payment.id}
                onClick={onRowClick(payment)}
                className={classes.row}
              >
                <td>
                  <Checkbox
                    checked={isChecked(payment)}
                    onChange={onToggleRow(payment)}
                  />
                </td>
                <td>
                  {payment.amount} {payment.currency}
                </td>
                <td>{payment.invoice_id}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </Table>
    </Stack>
  );
};

export default PaymentTable;
