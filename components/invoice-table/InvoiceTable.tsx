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
import { ChangeEvent, FC, MouseEvent, useMemo } from "react";
import { useStyles } from "./InvoiceType.styles";
import PaidIcon from "./PaidIcon";
import { InvoiceWithPartner } from "types/database";
import { useListState } from "@mantine/hooks";

interface InvoiceTableProps {
  invoices: InvoiceWithPartner[];
  onDelete?: (ids: number[]) => void;
  onPaid?: (ids: number[]) => void;
}

const InvoiceTable: FC<InvoiceTableProps> = ({
  invoices,
  onDelete: onDeleteProp,
  onPaid: onPaidProp,
}) => {
  const router = useRouter();

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
    if (onDeleteProp && selection.length > 0) {
      onDeleteProp(selection);
      handlers.filter((item) => !selection.includes(item));
    }
  };

  const onPaid = () => {
    if (onPaidProp && selection.length > 0) {
      onPaidProp(selection);
      handlers.filter((item) => !selection.includes(item));
    }
  };

  const isChecked = (item: InvoiceWithPartner) =>
    !!item.id && selection.includes(item.id);

  const unpaidSelected = useMemo(() => {
    return invoices
      .filter((invoice) => !invoice.paid)
      .map((invoice) => invoice.id)
      .some((id) => selection.includes(Number(id)));
  }, [selection, invoices]);

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
            <Button
              color="red"
              variant="light"
              onClick={onDelete}
              style={styles}
            >
              Delete
            </Button>
          )}
        </Transition>
        <Transition
          mounted={unpaidSelected}
          transition="fade"
          duration={250}
          timingFunction="ease"
        >
          {(styles) => (
            <Button
              color="green"
              variant="light"
              onClick={onPaid}
              style={styles}
            >
              Mark paid
            </Button>
          )}
        </Transition>
        <NavigationButton href="/invoices/new" text="New" />
      </Group>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>
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
            <th>Paid</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr
              key={invoice.id}
              className={classes.row}
              onClick={onRowClick(invoice)}
            >
              <td>
                <Checkbox
                  checked={isChecked(invoice)}
                  onChange={onToggleRow(invoice)}
                />
              </td>
              <td>{invoice.invoice_number}</td>
              <td>{new Date(invoice.issued_on).toLocaleDateString()}</td>
              <td>{invoice.partner.name}</td>
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
