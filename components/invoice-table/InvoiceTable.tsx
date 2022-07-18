import { Table } from "@mantine/core";
import { FC } from "react";
import { Invoice } from "types/database";

interface InvoiceTableProps {
  invoices: Invoice[];
}

const InvoiceTable: FC<InvoiceTableProps> = ({ invoices }) => {
  return (
    <Table>
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
        {invoices.map((invoice) => (
          <tr key={invoice.id}>
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
  );
};

export default InvoiceTable;
