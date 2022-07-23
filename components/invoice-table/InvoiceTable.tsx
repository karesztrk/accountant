import { Table } from "@mantine/core";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import NavigationButton from "components/navigation-button/NavigationButton";
import { cacheKeys, tableNames } from "lib";
import { FC } from "react";
import useSWR from "swr";
import { Invoice } from "types/database";

const fetcher = async () => {
  const { data, error } = await supabaseClient
    .from(tableNames.invoice)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const InvoiceTable: FC = () => {
  const { data: invoices, error } = useSWR<Invoice[], Error>(
    cacheKeys.invoices,
    fetcher
  );

  return (
    <>
      {error && <div>{error.message}</div>}
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
          {invoices?.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.invoice_number}</td>
              <td>{new Date(invoice.issued_on).toLocaleDateString()}</td>
              <td>{invoice.partner_name}</td>
              <td>
                {invoice.amount} {invoice.currency}
              </td>
              <td>{invoice.paid ? "true" : "false"}</td>
              <td>
                {/* TODO context menu */}
                <NavigationButton
                  href={`/invoices/${invoice.id}`}
                  text="Edit"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default InvoiceTable;
