import {
  AppShell,
  Container,
  Footer,
  useMantineColorScheme,
} from "@mantine/core";
import { FC, PropsWithChildren } from "react";
import Navbar from "./Navbar";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <AppShell
      padding="md"
      navbar={<Navbar />}
      footer={
        <Footer height={60} p="md">
          Károly Török &copy;{new Date().getFullYear()}
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
      <Container>{children}</Container>
    </AppShell>
  );
};

export default Layout;
