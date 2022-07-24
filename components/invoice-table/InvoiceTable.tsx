import { Group, Table } from "@mantine/core";
import NavigationButton from "components/navigation-button/NavigationButton";
import { useInvoices } from "hooks/use-invoices";
import { useRouter } from "next/router";
import { FC } from "react";
import { useStyles } from "./styles";

const InvoiceTable: FC = () => {
  const { data: invoices, error } = useInvoices();
  const router = useRouter();

  const { classes } = useStyles();

  const onRowClick = (id: number) => () => {
    router.push(`/invoices/${id}`);
  };

  return (
    <>
      {error && <div>{error.message}</div>}
      <Group position="right">
        <NavigationButton href="/invoices/new" text="New" />
      </Group>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Number</th>
            <th>Issused on</th>
            <th>Partner</th>
            <th>Price</th>
            <th>Paid</th>
          </tr>
        </thead>
        <tbody>
          {invoices?.map((invoice) => (
            <tr
              key={invoice.id}
              className={classes.row}
              onClick={onRowClick(invoice.id)}
            >
              <td>{invoice.invoice_number}</td>
              <td>{new Date(invoice.issued_on).toLocaleDateString()}</td>
              <td>{invoice.partner_name}</td>
              <td>
                {invoice.amount} {invoice.currency}
              </td>
              <td>{invoice.paid ? "true" : "false"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default InvoiceTable;
