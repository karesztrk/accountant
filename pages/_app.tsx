import { AppProps } from "next/app";
import Head from "next/head";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useState } from "react";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

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
          theme={{ colorScheme }}
        >
          <UserProvider supabaseClient={supabaseClient}>
            <Component {...pageProps} />
          </UserProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default MyApp;
