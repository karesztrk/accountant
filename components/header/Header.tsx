import React, { FC } from "react";
import {
  Autocomplete,
  Burger,
  Group,
  Header as MantineHeader,
} from "@mantine/core";
import { Rocket, Search } from "tabler-icons-react";
import { useStyles } from "./Header.styles";

interface HeaderProps {
  opened: boolean;
  onToggle: () => void;
}

const Header: FC<HeaderProps> = ({ opened, onToggle }) => {
  const { classes } = useStyles();

  return (
    <MantineHeader height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          <Burger
            opened={opened}
            onClick={onToggle}
            size="sm"
            className={classes.burger}
          />
          <Rocket size={35} strokeWidth={1.25} className={classes.logo} />
        </Group>

        <Group>
          <Autocomplete
            placeholder="Search"
            icon={<Search size={16} strokeWidth={1.5} />}
            data={[]}
          />
        </Group>
      </div>
    </MantineHeader>
  );
};

export default Header;
