import { AppShell, Container } from "@mantine/core";
import { FC, PropsWithChildren } from "react";
import Navbar from "./navbar/Navbar";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppShell
      padding="md"
      navbar={<Navbar />}
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
