import { Button, Checkbox, Group, Stack, Table } from "@mantine/core";
import NavigationButton from "components/navigation-button/NavigationButton";
import { useRouter } from "next/router";
import { ChangeEvent, FC, MouseEvent, useState } from "react";
import { Partner } from "types/database";
import { useStyles } from "./styles";

interface PartnerTableProps {
  partners: Partner[];
  onDelete?: (ids: number[]) => void;
}

const PartnerTable: FC<PartnerTableProps> = ({
  partners,
  onDelete: onDeleteProps,
}) => {
  const router = useRouter();
  const { classes } = useStyles();

  const [selection, setSelection] = useState<number[]>([]);

  const onRowClick = (id?: number) => (e: MouseEvent) => {
    if (!(e.target instanceof HTMLInputElement)) {
      router.push(`/partners/${id}`);
    }
  };

  const onToggleRow = (id: number) => () => {
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const onToggleAll = () => {
    setSelection((current) =>
      current.length === partners.length
        ? []
        : partners.map((item) => item.id || 0).filter(Boolean)
    );
  };

  const onDelete = () => {
    if (onDeleteProps && selection.length > 0) {
      onDeleteProps(selection);
      setSelection((current) =>
        current.filter((item) => !selection.includes(item))
      );
    }
  };

  return (
    <Stack>
      <Group position="right">
        {selection.length > 0 && (
          <Button color="red" variant="light" onClick={onDelete}>
            Delete
          </Button>
        )}
        <NavigationButton href="/partners/new" text="New" />
      </Group>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>
              <Checkbox
                onChange={onToggleAll}
                checked={selection.length === partners.length}
                indeterminate={
                  selection.length > 0 && selection.length !== partners.length
                }
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
                onClick={onRowClick(partner.id)}
              >
                <td>
                  <Checkbox
                    checked={selection.includes(partner.id)}
                    onChange={onToggleRow(partner.id)}
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
