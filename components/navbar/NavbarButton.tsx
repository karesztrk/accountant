import { Icon as TablerIcon, Tooltip, UnstyledButton } from "@mantine/core";
import { useStyles } from "./styles";

interface NavbarButtonProps {
  icon: TablerIcon;
  label: string;
  onClick: () => void;
}

const NavbarButton = ({ icon: Icon, label, onClick }: NavbarButtonProps) => {
  const { classes } = useStyles();

  return (
    <Tooltip label={label} position="right">
      <UnstyledButton onClick={onClick} className={classes.link}>
        <Icon />
      </UnstyledButton>
    </Tooltip>
  );
};

export default NavbarButton;
