import { Group, Stack, Table } from "@mantine/core";
import NavigationButton from "components/navigation-button/NavigationButton";
import { useRouter } from "next/router";
import { FC } from "react";
import { Partner } from "types/database";
import { useStyles } from "./styles";

interface PartnerTableProps {
  partners: Partner[];
}

const PartnerTable: FC<PartnerTableProps> = ({ partners }) => {
  const router = useRouter();
  const { classes } = useStyles();

  const onRowClick = (id: number) => () => {
    router.push(`/partners/${id}`);
  };

  return (
    <Stack>
      <Group position="right">
        <NavigationButton href="/partners/new" text="New" />
      </Group>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>VAT</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {partners.map((partner) => (
            <tr
              key={partner.id}
              className={classes.row}
              onClick={onRowClick(partner.id)}
            >
              <td>{partner.name}</td>
              <td>{partner.address}</td>
              <td>{partner.vat}</td>
              <td>{partner.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Stack>
  );
};

export default PartnerTable;
