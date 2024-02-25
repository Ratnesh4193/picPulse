"use client";
import "./globals.css";
import Layout from "./components/Layout/Layout";
import StoreProvider from "../lib/StoreProvider";
import { NextUIProvider } from "@nextui-org/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <StoreProvider>
          <NextUIProvider>
            <Layout>{children}</Layout>
          </NextUIProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
