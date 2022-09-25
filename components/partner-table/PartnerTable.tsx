import { Modal, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import CreateButton from "components/create-button/CreateButton";
import DeleteButton from "components/delete-button/DeleteButton";
import { newPartnerPage, partnersPage } from "components/navbar/pages";
import PartnerForm from "components/partner-form/PartnerForm";
import { usePartnerDeletion } from "hooks/partner/use-partner-deletion";
import { usePartners } from "hooks/partner/use-partners";
import { cacheKeys } from "lib";
import { useRouter } from "next/router";
import { FC, MouseEvent } from "react";
import { Partner } from "types/database";
import { useStyles } from "../DataTable.styles";
import { mutate } from "swr";

const PartnerTable: FC = ({}) => {
  const router = useRouter();
  const { classes } = useStyles();
  const [opened, handlers] = useDisclosure(false);

  const { data: partners = [], mutate: mutatePartners } = usePartners();
  const { trigger } = usePartnerDeletion();

  const onRowClick =
    (partner: Partner) => (e: MouseEvent<HTMLTableRowElement>) => {
      if (!(e.target instanceof HTMLInputElement) && partner.id) {
        Promise.all([
          mutate(cacheKeys.partner(`${partner.id}`), partner),
          router.push(
            {
              pathname: partnersPage.href,
              query: { id: partner.id },
            },
            undefined,
            { shallow: true }
          ),
        ]).then(handlers.open);
      }
    };

  const onConfirmDelete = (partner: Partner) => () => {
    if (partner) {
      trigger([partner.id])
        .then(() => {
          mutatePartners();
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
          pathname: newPartnerPage.href,
        },
        undefined,
        { shallow: true }
      )
      .then(handlers.open);
  };

  const onActionCellClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>VAT</th>
            <th>Email</th>
            <th></th>
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
                <td>{partner.name}</td>
                <td>{partner.address}</td>
                <td>{partner.vat}</td>
                <td>{partner.email}</td>
                <td className={classes.actionCell} onClick={onActionCellClick}>
                  <DeleteButton onConfirm={onConfirmDelete(partner)} />
                </td>
              </tr>
            ) : null
          )}
          <tr>
            <td colSpan={5}>
              <CreateButton onClick={onNewClick} />
            </td>
          </tr>
        </tbody>
      </Table>
      <Modal opened={opened} onClose={handlers.close} title={`Edit Partner`}>
        <PartnerForm onClose={handlers.close} />
      </Modal>
    </>
  );
};

export default PartnerTable;
