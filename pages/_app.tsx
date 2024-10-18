import "../public/css/styles.css";
import React from "react";
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
  )
}