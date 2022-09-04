import { ChangeEvent, FC, MouseEvent } from "react";
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
import { Payment } from "types/database";
import { useStyles } from "../DataTable.styles";
import { usePayments } from "hooks/payment/use-payments";
import { usePaymentDeletion } from "hooks/payment/use-payment-deletion";
import { showNotification } from "@mantine/notifications";

const PaymentTable: FC = ({}) => {
  const router = useRouter();

  const { data: payments = [], mutate } = usePayments();
  const { trigger } = usePaymentDeletion();

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
    if (selection.length > 0) {
      trigger(selection)
        .then(() => {
          mutate();
        })
        .catch((error) => {
          showNotification({
            id: error.code,
            title: "Error",
            message: error.message,
            color: "red",
          });
        });
      handlers.filter((item) => !selection.includes(item));
    }
  };

  const onSelectionCellClick = (e: MouseEvent) => {
    e.stopPropagation();
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
            <Button variant="outline" onClick={onDelete} style={styles}>
              Delete
            </Button>
          )}
        </Transition>
        <NavigationButton href={newPaymentPage.href} text="New" />
      </Group>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th className={classes.selectionCell}>
              <Checkbox
                onChange={onToggleAll}
                checked={allChecked}
                indeterminate={indeterminate}
              />
            </th>
            <th>Received on</th>
            <th>Price</th>
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
                <td
                  className={classes.selectionCell}
                  onClick={onSelectionCellClick}
                >
                  <Checkbox
                    checked={isChecked(payment)}
                    onChange={onToggleRow(payment)}
                  />
                </td>
                <td>
                  {new Date(
                    payment.transaction.transaction_date
                  ).toLocaleDateString(router.locale)}
                </td>
                <td>
                  {new Intl.NumberFormat(router.locale, {
                    style: "currency",
                    currency: payment.transaction.currency,
                    currencyDisplay: "narrowSymbol",
                  }).format(payment.transaction.amount)}
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </Table>
    </Stack>
  );
};

export default PaymentTable;
