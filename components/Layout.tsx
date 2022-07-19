import { AppShell, Container, MantineNumberSize } from "@mantine/core";
import { FC, PropsWithChildren } from "react";
import Navbar from "./navbar/Navbar";

type LayoutProps = PropsWithChildren<{
  size?: MantineNumberSize;
}>;

const Layout: FC<LayoutProps> = ({ size, children }) => {
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
      <Container size={size}>{children}</Container>
    </AppShell>
  );
};

export default Layout;
