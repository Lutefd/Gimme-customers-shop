import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { dark } from "@clerk/themes";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Navbar } from "~/components/Navbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider
      {...pageProps}
      localization={ptBR}
      appearance={{
        baseTheme: dark,
      }}
    >
      <Navbar />
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
