import { Group, Table } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import CreateButton from "components/create-button/CreateButton";
import DeleteButton from "components/delete-button/DeleteButton";
import {
  invoicesPage,
  newInvoicePage,
  uploadInvoicePage,
} from "components/navbar/pages";
import UploadButton from "components/upload-button/UploadButton";
import useFinance from "hooks/finance/use-finance";
import { useInvoiceDeletion } from "hooks/invoice/use-invoice-deletion";
import { useInvoices } from "hooks/invoice/use-invoices";
import { cacheKeys } from "lib";
import { useRouter } from "next/router";
import { FC, MouseEvent } from "react";
import { mutate } from "swr";
import { InvoiceWithPartner } from "types/database";
import { useStyles } from "../DataTable.styles";

const InvoiceTable: FC = () => {
  const router = useRouter();

  const { mutate: mutateFinanceState } = useFinance();

  const { data: invoices = [], mutate: mutateInvoices } = useInvoices();
  const { trigger } = useInvoiceDeletion();

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
            { shallow: true },
          ),
        ]).then(() => {
          mutateFinanceState({ opened: true });
        });
      }
    };

  const onConfirmDelete = (invoice: InvoiceWithPartner) => () => {
    if (invoice) {
      trigger([invoice.id])
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
        { shallow: true },
      )
      .then(() => {
        mutateFinanceState({ opened: true });
      });
  };

  const onUploadClick = () => {
    router
      .push(
        {
          pathname: uploadInvoicePage.href,
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
              <DeleteButton onConfirm={onConfirmDelete(invoice)} />
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={5}>
            <Group position="center">
              <CreateButton
                className={classes.actionButton}
                onClick={onNewClick}
              />
              <UploadButton
                className={classes.actionButton}
                onClick={onUploadClick}
              />
            </Group>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default InvoiceTable;
