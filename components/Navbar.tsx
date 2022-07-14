import {
  Center,
  createStyles,
  Group,
  Navbar as MantineNavbar,
  Tooltip,
  UnstyledButton,
  Icon as TablerIcon,
} from "@mantine/core";
import { useState } from "react";
import { Home2, Logout } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 7],
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" withArrow transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon />
      </UnstyledButton>
    </Tooltip>
  );
}

const pages = [
  { icon: Home2, label: "Home" },
  // { icon: Gauge, label: 'Dashboard' },
];

const Navbar = () => {
  const [active, setActive] = useState(0);

  const links = pages.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <MantineNavbar width={{ base: 80 }} p="md">
      <Center>{/* <MantineLogoSmall /> */}Logo</Center>
      <MantineNavbar.Section grow mt={50}>
        <Group direction="column" align="center" spacing={0}>
          {links}
        </Group>
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <Group direction="column" align="center" spacing={0}>
          <NavbarLink icon={Logout} label="Logout" />
        </Group>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
