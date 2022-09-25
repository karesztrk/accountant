import { Table } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import CreateButton from "components/create-button/CreateButton";
import DeleteButton from "components/delete-button/DeleteButton";
import { newPaymentPage, paymentsPage } from "components/navbar/pages";
import useFinance from "hooks/finance/use-finance";
import { usePaymentDeletion } from "hooks/payment/use-payment-deletion";
import { usePayments } from "hooks/payment/use-payments";
import { cacheKeys } from "lib";
import { useRouter } from "next/router";
import { FC, MouseEvent } from "react";
import { mutate } from "swr";
import { Payment } from "types/database";
import { useStyles } from "../DataTable.styles";

const PaymentTable: FC = () => {
  const router = useRouter();

  const { mutate: mutateFinanceState } = useFinance();
  const { data: payments = [], mutate: mutatePayments } = usePayments();
  const { trigger } = usePaymentDeletion();

  const { classes } = useStyles();

  const onRowClick =
    (payment: Payment) => (e: MouseEvent<HTMLTableRowElement>) => {
      if (!(e.target instanceof HTMLInputElement) && payment.id) {
        Promise.all([
          mutate(cacheKeys.payment(`${payment.id}`), payment),
          router.push(
            {
              pathname: paymentsPage.href,
              query: { id: payment.id },
            },
            undefined,
            { shallow: true }
          ),
        ]).then(() => {
          mutateFinanceState({ opened: true });
        });
      }
    };

  const onConfirmDelete = (payment: Payment) => () => {
    if (payment) {
      trigger([payment.id])
        .then(() => {
          mutatePayments();
        })
        .catch((error) => {
          showNotification({
            id: error.code,
            title: "Error",
            message: error.message,
            color: "red",
          });
        });
    }
  };

  const onNewClick = () => {
    router
      .push(
        {
          pathname: newPaymentPage.href,
        },
        undefined,
        { shallow: true }
      )
      .then(() => {
        mutateFinanceState({ opened: true });
      });
  };

  const onActionCellClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Table highlightOnHover>
      <thead>
        <tr>
          <th>Received on</th>
          <th>Price</th>
          <th></th>
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
              <td className={classes.actionCell} onClick={onActionCellClick}>
                <DeleteButton onConfirm={onConfirmDelete(payment)} />
              </td>
            </tr>
          ) : null
        )}
        <tr>
          <td colSpan={5}>
            <CreateButton onClick={onNewClick} />
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default PaymentTable;
