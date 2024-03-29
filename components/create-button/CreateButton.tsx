import { ActionIcon } from "@mantine/core";
import React, { FC } from "react";
import { Plus } from "tabler-icons-react";
import { useStyles } from "./CreateButton.styles";

interface CreateButtonProps {
  onClick: () => void;
  className?: string;
}

const CreateButton: FC<CreateButtonProps> = ({ onClick, className }) => {
  const { classes, cx } = useStyles();
  return (
    <ActionIcon
      className={cx(classes.wrapper, className)}
      variant="light"
      color="brand"
      onClick={onClick}
    >
      <Plus size={18} />
    </ActionIcon>
  );
};

export default CreateButton;
