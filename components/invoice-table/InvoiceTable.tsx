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
import { invoicesPage, newInvoicePage } from "components/navbar/pages";
import NavigationButton from "components/navigation-button/NavigationButton";
import useFinance from "hooks/finance/use-finance";
import { useInvoiceDeletion } from "hooks/invoice/use-invoice-deletion";
import { useInvoices } from "hooks/invoice/use-invoices";
import { cacheKeys } from "lib";
import { useRouter } from "next/router";
import { ChangeEvent, FC, MouseEvent } from "react";
import { mutate } from "swr";
import { InvoiceWithPartner } from "types/database";
import { useStyles } from "../DataTable.styles";

const InvoiceTable: FC = () => {
  const router = useRouter();

  const { mutate: mutateFinanceState } = useFinance();

  const { data: invoices = [], mutate: mutateInvoices } = useInvoices();
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
        Promise.all([
          mutate(cacheKeys.invoice(`${invoice.id}`), invoice),
          router.push(
            {
              pathname: invoicesPage.href,
              query: { id: invoice.id },
            },
            undefined,
            { shallow: true }
          ),
        ]).then(() => {
          mutateFinanceState({ opened: true });
        });
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
          mutateInvoices();
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

  const onNewClick = () => {
    router
      .push(
        {
          pathname: newInvoicePage.href,
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
                {new Intl.NumberFormat(router.locale, {
                  style: "currency",
                  currency: invoice.currency,
                  currencyDisplay: "narrowSymbol",
                }).format(invoice.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Stack>
  );
};

export default InvoiceTable;
