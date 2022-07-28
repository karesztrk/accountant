import { Center, Group, Navbar as MantineNavbar } from "@mantine/core";
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
        <Group direction="column" align="center" spacing={0}>
          {pages.map((link) => (
            <NavbarLink {...link} key={link.label} />
          ))}
        </Group>
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <Group direction="column" align="center" spacing={0}>
          <NavbarButton icon={Logout} label="Logout" onClick={onLogout} />
        </Group>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
