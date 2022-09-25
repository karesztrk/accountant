import { ActionIcon } from "@mantine/core";
import React, { FC } from "react";
import { Plus } from "tabler-icons-react";
import { useStyles } from "./CreateButton.styles";

interface CreateButtonProps {
  onClick: () => void;
}

const CreateButton: FC<CreateButtonProps> = ({ onClick }) => {
  const { classes } = useStyles();
  return (
    <ActionIcon
      className={classes.wrapper}
      variant="light"
      color="brand"
      onClick={onClick}
    >
      <Plus size={18} />
    </ActionIcon>
  );
};

export default CreateButton;
