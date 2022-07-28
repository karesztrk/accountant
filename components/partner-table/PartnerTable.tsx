import { Stack, Table } from "@mantine/core";
import { FC } from "react";
import { Partner } from "types/database";

interface PartnerTableProps {
  partners: Partner[];
}

const PartnerTable: FC<PartnerTableProps> = ({ partners }) => {
  return (
    <Stack>
      <Table>
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
            <tr key={partner.id}>
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
