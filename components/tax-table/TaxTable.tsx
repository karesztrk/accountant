import {
  Button,
  Checkbox,
  Group,
  Stack,
  Table,
  Transition,
} from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { newTaxPage, taxesPage } from "components/navbar/pages";
import useFinance from "hooks/finance/use-finance";
import { useTaxDeletion } from "hooks/tax/use-tax-deletion";
import { useTaxes } from "hooks/tax/use-taxes";
import { cacheKeys } from "lib";
import { useRouter } from "next/router";
import { ChangeEvent, FC, MouseEvent } from "react";
import { mutate } from "swr";
import { Tax } from "types/database";
import { useStyles } from "../DataTable.styles";

const TaxTable: FC = () => {
  const router = useRouter();

  const { classes } = useStyles();

  const { mutate: mutateFinanceState } = useFinance();
  const { data: taxes = [], mutate: mutateTaxes } = useTaxes();
  const { trigger } = useTaxDeletion();

  const [selection, handlers] = useListState<number>([]);

  const allChecked = taxes.length > 0 && selection.length === taxes.length;

  const indeterminate =
    selection.length > 0 && selection.length !== taxes.length;

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
          { shallow: true }
        ),
      ]).then(() => {
        mutateFinanceState({ opened: true });
      });
    }
  };

  const onToggleRow = (tax: Tax) => (e: ChangeEvent<HTMLInputElement>) => {
    if (!tax.id) {
      return;
    }
    if (e.target.checked) {
      handlers.append(tax.id);
    } else {
      handlers.filter((item) => item !== tax.id);
    }
  };

  const onToggleAll = () => {
    if (allChecked) {
      handlers.setState([]);
    } else {
      handlers.setState(taxes.map((item) => item.id || 0).filter(Boolean));
    }
  };

  const onDelete = () => {
    if (selection.length > 0) {
      trigger(selection)
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
      handlers.filter((item) => !selection.includes(item));
    }
  };

  const onSelectionCellClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const isChecked = (item: Tax) => !!item.id && selection.includes(item.id);

  const onNewClick = () => {
    router
      .push(
        {
          pathname: newTaxPage.href,
        },
        undefined,
        { shallow: true }
      )
      .then(() => {
        mutateFinanceState({ opened: true });
      });
  };

  return (
    <Stack>
      <Group>
        <Button onClick={onNewClick}>New</Button>
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
            <th>Paid on</th>
            <th>Price</th>
            <th>Tax system</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {taxes.map((tax) =>
            tax.id ? (
              <tr
                key={tax.id}
                className={classes.row}
                onClick={onRowClick(tax)}
              >
                <td
                  className={classes.selectionCell}
                  onClick={onSelectionCellClick}
                >
                  <Checkbox
                    checked={isChecked(tax)}
                    onChange={onToggleRow(tax)}
                  />
                </td>
                <td>
                  {new Date(
                    tax.transaction.transaction_date
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
              </tr>
            ) : null
          )}
        </tbody>
      </Table>
    </Stack>
  );
};

export default TaxTable;
