import { Group, Stack, Table, Tooltip } from "@mantine/core";
import NavigationButton from "components/navigation-button/NavigationButton";
import { useInvoices } from "hooks/use-invoices";
import { useRouter } from "next/router";
import { FC } from "react";
import { useStyles } from "./styles";
import { Cashoff, Cash } from "tabler-icons-react";
import PaidIcon from "./PaidIcon";

const InvoiceTable: FC = () => {
  const { data: invoices, error } = useInvoices();
  const router = useRouter();

  const { classes } = useStyles();

  const onRowClick = (id: number) => () => {
    router.push(`/invoices/${id}`);
  };

  return (
    <Stack>
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
              <td>
                <PaidIcon paid={invoice.paid} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Stack>
  );
};

export default InvoiceTable;
