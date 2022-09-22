import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Stack,
  Table,
  Tooltip,
} from "@mantine/core";
import { useDisclosure, useTimeout } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { invoicesPage, newInvoicePage } from "components/navbar/pages";
import useFinance from "hooks/finance/use-finance";
import { useInvoiceDeletion } from "hooks/invoice/use-invoice-deletion";
import { useInvoices } from "hooks/invoice/use-invoices";
import { cacheKeys } from "lib";
import { useRouter } from "next/router";
import { FC, MouseEvent, useState } from "react";
import { mutate } from "swr";
import { AlertCircle, Plus, Trash } from "tabler-icons-react";
import { InvoiceWithPartner } from "types/database";
import { useStyles } from "../DataTable.styles";

const InvoiceTable: FC = () => {
  const router = useRouter();

  const { mutate: mutateFinanceState } = useFinance();

  const { data: invoices = [], mutate: mutateInvoices } = useInvoices();
  const { trigger } = useInvoiceDeletion();

  const { classes } = useStyles();

  const [selected, setSelected] = useState<InvoiceWithPartner>();

  const { start, clear } = useTimeout(() => setSelected(undefined), 2500);

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

  const onConfirmDelete = () => {
    if (selected) {
      trigger([selected.id])
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
    }
  };

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

  const onDelete = (invoice: InvoiceWithPartner) => (e: MouseEvent) => {
    e.stopPropagation();
    clear();
    if (selected?.id === invoice?.id) {
      onConfirmDelete();
    } else {
      setSelected(invoice);
      start();
    }
  };

  const onActionCellClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Stack>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Number</th>
            <th>Issused on</th>
            <th>Partner</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr
              key={invoice.id}
              className={classes.row}
              onClick={onRowClick(invoice)}
            >
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
              <td className={classes.actionCell} onClick={onActionCellClick}>
                <ActionIcon variant="transparent" onClick={onDelete(invoice)}>
                  {selected?.id === invoice.id ? (
                    <Tooltip label="Click to confirm" withArrow>
                      <span>
                        <AlertCircle size={18} />
                      </span>
                    </Tooltip>
                  ) : (
                    <Trash size={18} />
                  )}
                </ActionIcon>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={5}>
              <ActionIcon
                className={classes.addButton}
                variant="light"
                color="brand"
                onClick={onNewClick}
              >
                <Plus size={18} />
              </ActionIcon>
            </td>
          </tr>
        </tbody>
      </Table>
    </Stack>
  );
};

export default InvoiceTable;
