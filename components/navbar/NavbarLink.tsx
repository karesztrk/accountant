import { Group, Text, Tooltip, UnstyledButton } from "@mantine/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useStyles } from "./Navbar.styles";
import { Icon } from "tabler-icons-react";

interface NavbarLinkProps {
  icon: Icon;
  label: string;
  href: string;
}

const NavbarLink = ({ icon: Icon, label, href }: NavbarLinkProps) => {
  const { pathname } = useRouter();
  const { classes, cx } = useStyles();

  const active =
    pathname === href || (href.length > 1 && pathname.startsWith(href));

  return (
    <NextLink href={href} passHref>
      <Group className={cx(classes.link, { [classes.active]: active })}>
        <UnstyledButton className={cx(classes.icon)}>
          <Icon />
        </UnstyledButton>
        <Text className={classes.text}>{label}</Text>
      </Group>
    </NextLink>
  );
};
export default NavbarLink;
