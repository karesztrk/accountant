import {
  AppShell,
  Navbar,
  Header,
  useMantineColorScheme,
  Group,
  ActionIcon,
  Footer,
  Box,
} from "@mantine/core";
import { Session } from "@supabase/supabase-js";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Sun, MoonStars } from "tabler-icons-react";
import MainLinks from "../components/MainLinks";

const Home: NextPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Accountant application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
        padding="md"
        navbar={
          <Navbar height={600} p="xs" width={{ base: 300 }}>
            <Navbar.Section mt="xs">
              <Box
                sx={(theme) => ({
                  paddingLeft: theme.spacing.xs,
                  paddingRight: theme.spacing.xs,
                  paddingBottom: theme.spacing.lg,
                  borderBottom: `1px solid ${
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[4]
                      : theme.colors.gray[2]
                  }`,
                })}
              >
                <Group position="apart">
                  {/* <Logo colorScheme={colorScheme} /> */}
                  Logo
                  <ActionIcon
                    variant="default"
                    onClick={() => toggleColorScheme()}
                    size={30}
                  >
                    {colorScheme === "dark" ? (
                      <Sun size={16} />
                    ) : (
                      <MoonStars size={16} />
                    )}
                  </ActionIcon>
                </Group>
              </Box>
            </Navbar.Section>
            <Navbar.Section grow mt="md">
              <MainLinks />
            </Navbar.Section>
            <Navbar.Section>{/* <User /> */}</Navbar.Section>
          </Navbar>
        }
        footer={
          <Footer height={60} p="md">
            Application footer
          </Footer>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        Your application goes here
      </AppShell>
    </>
  );
};

export default Home;
