import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { UserProvider } from "@supabase/auth-helpers-react";
import NavigationProgress from "components/navigation-progress/NavigationProgress";
import { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <Head>
        <title>Accountant</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            colors: {
              brand: [
                "#C7FCEC",
                "#98FBDD",
                "#6CFCD0",
                "#42FFC6",
                "#20FAB9",
                "#0AEFAA",
                "#0DCE94",
                "#0FB281",
                "#109A70",
                "#108562",
              ],
            },
            primaryColor: "brand",
            focusRing: "always",
          }}
        >
          <NavigationProgress />
          <NotificationsProvider>
            <UserProvider supabaseClient={supabaseClient}>
              <Component {...pageProps} />
            </UserProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default MyApp;
