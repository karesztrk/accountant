import { Navbar as MantineNavbar, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { FC } from "react";
import { Logout } from "tabler-icons-react";
import { useStyles } from "./Navbar.styles";
import NavbarButton from "./NavbarButton";
import NavbarLink from "./NavbarLink";
import { loginPage, pages } from "./pages";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "lib/database.types";

interface NavbarProps {
  hidden?: boolean;
}

const Navbar: FC<NavbarProps> = ({ hidden }) => {
  const { push } = useRouter();
  const { classes, cx } = useStyles();
  const supabaseClient = useSupabaseClient<Database>();

  const onLogout = () => {
    supabaseClient.auth.signOut();
    push(loginPage.href);
  };

  return (
    <MantineNavbar
      className={cx(classes.wrapper, { [classes.hidden]: hidden })}
    >
      <MantineNavbar.Section grow mt={50}>
        <Stack spacing={4}>
          {pages.map((link) => (
            <NavbarLink {...link} key={link.label} />
          ))}
        </Stack>
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <Stack align="center" spacing={4}>
          <NavbarButton icon={Logout} label="Logout" onClick={onLogout} />
        </Stack>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
