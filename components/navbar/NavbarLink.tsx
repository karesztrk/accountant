import { Icon as TablerIcon, Tooltip, UnstyledButton } from "@mantine/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useStyles } from "./Navbar.styles";

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  href: string;
}

const NavbarLink = ({ icon: Icon, label, href }: NavbarLinkProps) => {
  const { pathname } = useRouter();
  const { classes, cx } = useStyles();

  const active = pathname === href;

  return (
    <Tooltip label={label} position="right">
      <div>
        <NextLink href={href} passHref>
          <UnstyledButton
            className={cx(classes.link, { [classes.active]: active })}
          >
            <Icon />
          </UnstyledButton>
        </NextLink>
      </div>
    </Tooltip>
  );
};
export default NavbarLink;
