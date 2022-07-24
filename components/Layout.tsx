import { AppShell, Container, MantineNumberSize, Title } from "@mantine/core";
import { FC, PropsWithChildren } from "react";
import Navbar from "./navbar/Navbar";
import { useStyles } from "./styles";

type LayoutProps = PropsWithChildren<{
  size?: MantineNumberSize;
  title?: string;
}>;

const Layout: FC<LayoutProps> = ({ size, title, children }) => {
  const { classes } = useStyles();

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
