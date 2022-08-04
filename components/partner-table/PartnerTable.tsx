import {
  Button,
  Checkbox,
  Group,
  Stack,
  Table,
  Transition,
} from "@mantine/core";
import { useListState } from "@mantine/hooks";
import NavigationButton from "components/navigation-button/NavigationButton";
import { useRouter } from "next/router";
import { ChangeEvent, FC, MouseEvent } from "react";
import { Partner } from "types/database";
import { useStyles } from "../DataTable.styles";

interface PartnerTableProps {
  partners: Partner[];
  onDelete?: (ids: number[]) => void;
}

const PartnerTable: FC<PartnerTableProps> = ({
  partners,
  onDelete: onDeleteProp,
}) => {
  const router = useRouter();
  const { classes } = useStyles();

  const [selection, handlers] = useListState<number>([]);

  const allChecked =
    partners.length > 0 && selection.length === partners.length;

  const indeterminate =
    selection.length > 0 && selection.length !== partners.length;

  const onRowClick =
    (partner: Partner) => (e: MouseEvent<HTMLTableRowElement>) => {
      if (!(e.target instanceof HTMLInputElement) && partner.id) {
        router.push(`/partners/${partner.id}`);
      }
    };

  const onToggleRow =
    (partner: Partner) => (e: ChangeEvent<HTMLInputElement>) => {
      if (!partner.id) {
        return;
      }
      if (e.target.checked) {
        handlers.append(partner.id);
      } else {
        handlers.filter((item) => item !== partner.id);
      }
    };

  const onToggleAll = () => {
    if (allChecked) {
      handlers.setState([]);
    } else {
      handlers.setState(partners.map((item) => item.id || 0).filter(Boolean));
    }
  };

  const onDelete = () => {
    if (onDeleteProp && selection.length > 0) {
      onDeleteProp(selection);
      handlers.filter((item) => !selection.includes(item));
    }
  };

  const isChecked = (item: Partner) => !!item.id && selection.includes(item.id);

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
        <NavigationButton href="/partners/new" text="New" />
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
            <th>Name</th>
            <th>Address</th>
            <th>VAT</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {partners.map((partner) =>
            partner.id ? (
              <tr
                key={partner.id}
                className={classes.row}
                onClick={onRowClick(partner)}
              >
                <td>
                  <Checkbox
                    checked={isChecked(partner)}
                    onChange={onToggleRow(partner)}
                  />
                </td>
                <td>{partner.name}</td>
                <td>{partner.address}</td>
                <td>{partner.vat}</td>
                <td>{partner.email}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </Table>
    </Stack>
  );
};

export default PartnerTable;
