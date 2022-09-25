import {
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { UserProvider } from "@supabase/auth-helpers-react";
import NavigationProgress from "components/navigation-progress/NavigationProgress";
import { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";

const fontFamily = "Inter";
const headingFontFamily = "Barlow";

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
            fontFamily: `'${fontFamily}', sans-serif`,
            headings: {
              fontFamily: `'${headingFontFamily}', sans-serif`,
              sizes: {
                h1: { fontWeight: 900, fontSize: 44 },
              },
            },
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
          <Global
            styles={[
              {
                "@font-face": {
                  fontFamily,
                  src: "url(/Inter-latin-var.woff2) format('woff2')",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontDisplay: "swap",
                  unicodeRange:
                    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
                },
              },
              {
                "@font-face": {
                  fontFamily,
                  src: "url(/Inter-latin-var.woff2) format('woff2')",
                  fontWeight: 700,
                  fontStyle: "normal",
                  fontDisplay: "swap",
                  unicodeRange:
                    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
                },
              },
              {
                "@font-face": {
                  fontFamily: headingFontFamily,
                  src: "url(/Barlow-latin-black.woff2) format('woff2')",
                  fontWeight: 900,
                  fontStyle: "normal",
                  fontDisplay: "swap",
                  unicodeRange:
                    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;",
                },
              },
            ]}
          />
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
