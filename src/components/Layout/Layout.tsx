import Head from "next/head";
import { View, Logo, StyleProvider, ThemeProvider } from "vcc-ui";
import volvo from "vcc-ui/dist/themes/volvo";

export default function Layout({
  siteTitle,
  siteDescription,
  children,
}: {
  siteTitle?: string;
  siteDescription?: string;
  children: React.ReactNode;
}) {
  const title = siteTitle || "India | Volvo Cars";
  const description =
    siteDescription ||
    "Welcome to the India site of Volvo Cars. Explore and design your favorite Volvo SUV, estate and sedan today.";

  return (
    <div className={`container`}>
      <Head>
        <title>{title}</title>
        <link
          rel="icon"
          href="https://www.volvocars.com/static/shared/images/favicons/favicon-32x32.v2.png"
        />
        <meta name="description" content={description} />
      </Head>
      <StyleProvider>
        <ThemeProvider theme={volvo}>
          <header>
            <View
              alignItems="end"
              extend={{ marginTop: "20px", marginBottom: "20px" }}
            >
              <Logo height={24} type="spreadmark" />
            </View>
          </header>
          <main>{children}</main>
        </ThemeProvider>
      </StyleProvider>
    </div>
  );
}
