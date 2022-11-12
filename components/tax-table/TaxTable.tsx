import { Table } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import CreateButton from "components/create-button/CreateButton";
import DeleteButton from "components/delete-button/DeleteButton";
import { newTaxPage, taxesPage } from "components/navbar/pages";
import useFinance from "hooks/finance/use-finance";
import { useTaxDeletion } from "hooks/tax/use-tax-deletion";
import { useTaxes } from "hooks/tax/use-taxes";
import { cacheKeys } from "lib";
import { useRouter } from "next/router";
import { FC, MouseEvent } from "react";
import { mutate } from "swr";
import { Tax } from "types/database";
import { useStyles } from "../DataTable.styles";

const TaxTable: FC = () => {
  const router = useRouter();

  const { classes } = useStyles();

  const { mutate: mutateFinanceState } = useFinance();
  const { data: taxes = [], mutate: mutateTaxes } = useTaxes();
  const { trigger } = useTaxDeletion();

  const onRowClick = (tax: Tax) => (e: MouseEvent<HTMLTableRowElement>) => {
    if (!(e.target instanceof HTMLInputElement) && tax.id) {
      Promise.all([
        mutate(cacheKeys.tax(`${tax.id}`), tax),
        router.push(
          {
            pathname: taxesPage.href,
            query: { id: tax.id },
          },
          undefined,
          { shallow: true },
        ),
      ]).then(() => {
        mutateFinanceState({ opened: true });
      });
    }
  };

  const onConfirmDelete = (tax: Tax) => () => {
    if (tax) {
      trigger([tax.id])
        .then(() => {
          mutateTaxes();
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
          pathname: newTaxPage.href,
        },
        undefined,
        { shallow: true },
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
          <th>Paid on</th>
          <th>Price</th>
          <th>Tax system</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {taxes.map((tax) =>
          tax.id ? (
            <tr key={tax.id} className={classes.row} onClick={onRowClick(tax)}>
              <td>
                {new Date(
                  tax.transaction.transaction_date || 0,
                ).toLocaleDateString(router.locale)}
              </td>
              <td>
                {new Intl.NumberFormat(router.locale, {
                  style: "currency",
                  currency: tax.transaction.currency,
                  currencyDisplay: "narrowSymbol",
                }).format(tax.transaction.amount)}
              </td>
              <td>{tax.system}</td>
              <td>{tax.description}</td>
              <td className={classes.actionCell} onClick={onActionCellClick}>
                <DeleteButton onConfirm={onConfirmDelete(tax)} />
              </td>
            </tr>
          ) : null,
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

export default TaxTable;
