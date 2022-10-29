import { AppShell, Container, MantineNumberSize, Title } from "@mantine/core";
import { FC, PropsWithChildren } from "react";
import Navbar from "./navbar/Navbar";
import { useStyles } from "./Layout.styles";
import { useUser } from "@supabase/auth-helpers-react";
import Header from "./header/Header";
import { useDisclosure } from "@mantine/hooks";

type LayoutProps = PropsWithChildren<{
  size?: MantineNumberSize;
  title?: string;
}>;

const Layout: FC<LayoutProps> = ({ size, title, children }) => {
  const { classes } = useStyles();
  const user = useUser();
  const [opened, handlers] = useDisclosure(false);

  return (
    <AppShell
      padding="sm"
      navbar={user ? <Navbar hidden={!opened} /> : undefined}
      header={<Header opened={opened} onToggle={handlers.toggle} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Container size={size}>
        {title && (
          <Title className={classes.title} order={1}>
            {title}
          </Title>
        )}
        {children}
      </Container>
    </AppShell>
  );
};

export default Layout;
