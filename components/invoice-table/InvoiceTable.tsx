import {
  Button,
  Checkbox,
  Group,
  Stack,
  Table,
  Transition,
} from "@mantine/core";
import NavigationButton from "components/navigation-button/NavigationButton";
import { useRouter } from "next/router";
import { ChangeEvent, FC, MouseEvent } from "react";
import { useStyles } from "../DataTable.styles";
import { InvoiceWithPartner } from "types/database";
import { useListState } from "@mantine/hooks";
import { useInvoiceDeletion } from "hooks/invoice/use-invoice-deletion";
import { showNotification } from "@mantine/notifications";
import { useInvoices } from "hooks/invoice/use-invoices";

const InvoiceTable: FC = () => {
  const router = useRouter();

  const { data: invoices = [], mutate } = useInvoices();
  const { trigger } = useInvoiceDeletion();

  const [selection, handlers] = useListState<number>([]);

  const allChecked =
    invoices.length > 0 && selection.length === invoices.length;

  const indeterminate =
    selection.length > 0 && selection.length !== invoices.length;

  const { classes } = useStyles();

  const onRowClick =
    (invoice: InvoiceWithPartner) => (e: MouseEvent<HTMLTableRowElement>) => {
      if (!(e.target instanceof HTMLInputElement) && invoice.id) {
        router.push(`/invoices/${invoice.id}`);
      }
    };

  const onToggleRow =
    (invoice: InvoiceWithPartner) => (e: ChangeEvent<HTMLInputElement>) => {
      if (!invoice.id) {
        return;
      }
      if (e.target.checked) {
        handlers.append(invoice.id);
      } else {
        handlers.filter((item) => item !== invoice.id);
      }
    };

  const onToggleAll = () => {
    if (allChecked) {
      handlers.setState([]);
    } else {
      handlers.setState(invoices.map((item) => item.id || 0).filter(Boolean));
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

  const isChecked = (item: InvoiceWithPartner) =>
    !!item.id && selection.includes(item.id);

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
        <NavigationButton href="/invoices/new" text="New" />
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
            <th>Number</th>
            <th>Issused on</th>
            <th>Partner</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr
              key={invoice.id}
              className={classes.row}
              onClick={onRowClick(invoice)}
            >
              <td
                className={classes.selectionCell}
                onClick={onSelectionCellClick}
              >
                <Checkbox
                  checked={isChecked(invoice)}
                  onChange={onToggleRow(invoice)}
                />
              </td>
              <td>{invoice.invoice_number}</td>
              <td>
                {new Date(invoice.issued_on).toLocaleDateString(router.locale)}
              </td>
              <td>{invoice.partner.name}</td>
              <td>
                {invoice.amount} {invoice.currency}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Stack>
  );
};

export default InvoiceTable;
