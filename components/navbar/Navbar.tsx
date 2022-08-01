import { Center, Navbar as MantineNavbar, Stack } from "@mantine/core";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { Logout } from "tabler-icons-react";
import NavbarButton from "./NavbarButton";
import NavbarLink from "./NavbarLink";
import { pages } from "./pages";

const Navbar = () => {
  const { push } = useRouter();

  const onLogout = () => {
    supabaseClient.auth.signOut();
    push("/");
  };

  return (
    <MantineNavbar width={{ base: 80 }} p="md">
      <Center>💰</Center>
      <MantineNavbar.Section grow mt={50}>
        <Stack align="center" spacing={4}>
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
