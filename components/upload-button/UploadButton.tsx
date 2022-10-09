import { ActionIcon } from "@mantine/core";
import React, { FC } from "react";
import { Upload } from "tabler-icons-react";
import { useStyles } from "./UploadButton.styles";

interface UploadButtonProps {
  onClick: () => void;
  className?: string;
}

const UploadButton: FC<UploadButtonProps> = ({ onClick, className }) => {
  const { classes, cx } = useStyles();
  return (
    <ActionIcon
      className={cx(classes.wrapper, className)}
      variant="light"
      color="brand"
      onClick={onClick}
    >
      <Upload size={18} />
    </ActionIcon>
  );
};

export default UploadButton;
