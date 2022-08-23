import { Tooltip, UnstyledButton } from "@mantine/core";
import { Icon } from "tabler-icons-react";
import { useStyles } from "./Navbar.styles";

interface NavbarButtonProps {
  icon: Icon;
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
