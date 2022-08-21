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
import { newTaxPage } from "components/navbar/pages";
import NavigationButton from "components/navigation-button/NavigationButton";
import { useTaxDeletion } from "hooks/tax/use-tax-deletion";
import { useTaxes } from "hooks/tax/use-taxes";
import { useRouter } from "next/router";
import { ChangeEvent, FC, MouseEvent } from "react";
import { Tax } from "types/database";
import { useStyles } from "../DataTable.styles";

const TaxTable: FC = () => {
  const router = useRouter();

  const { classes } = useStyles();

  const { data: taxes = [], mutate } = useTaxes();
  const { trigger } = useTaxDeletion();

  const [selection, handlers] = useListState<number>([]);

  const allChecked = taxes.length > 0 && selection.length === taxes.length;

  const indeterminate =
    selection.length > 0 && selection.length !== taxes.length;

  const onRowClick = (tax: Tax) => (e: MouseEvent<HTMLTableRowElement>) => {
    if (!(e.target instanceof HTMLInputElement) && tax.id) {
      router.push(`/taxes/${tax.id}`);
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

  const isChecked = (item: Tax) => !!item.id && selection.includes(item.id);

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
        <NavigationButton href={newTaxPage.href} text="New" />
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
                  {tax.transaction.amount} {tax.transaction.currency}
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
