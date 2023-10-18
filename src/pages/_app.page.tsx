import { AppProps, ErrorBoundary } from "@blitzjs/next";
import React, { Suspense } from "react";
import { withBlitz } from "src/blitz-client";
import "src/styles/globals.css";
import { RootErrorFallback } from "@/core/components/RootErrorFallback";
import { Loader, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
        }}
      >
        <Notifications position="top-left" />
        <Suspense fallback={<Loader />}>{<Component {...pageProps} />}</Suspense>
      </MantineProvider>
    </ErrorBoundary>
  );
}

export default withBlitz(MyApp);
