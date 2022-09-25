import { ActionIcon, Tooltip } from "@mantine/core";
import { useTimeout } from "@mantine/hooks";
import { FC, MouseEvent, useState } from "react";
import { AlertCircle, Trash } from "tabler-icons-react";

interface DeleteButtonProps {
  onConfirm?: () => void;
}

const DeleteButton: FC<DeleteButtonProps> = ({ onConfirm }) => {
  const [selected, setSelected] = useState(false);

  const { start, clear } = useTimeout(() => setSelected(false), 2500);

  const onDelete = (e: MouseEvent) => {
    e.stopPropagation();
    clear();
    if (selected && onConfirm) {
      onConfirm();
    } else {
      setSelected(true);
      start();
    }
  };

  return (
    <ActionIcon variant="transparent" onClick={onDelete}>
      {selected ? (
        <Tooltip label="Click to confirm" withArrow>
          <span>
            <AlertCircle size={18} />
          </span>
        </Tooltip>
      ) : (
        <Trash size={18} />
      )}
    </ActionIcon>
  );
};

export default DeleteButton;
