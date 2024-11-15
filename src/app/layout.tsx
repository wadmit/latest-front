import type { Metadata } from "next";
import "@/styles/global.css";
import MainLayoutScript from "@/page-components/scripts/MainLayoutScript";
import TanstackProvider from "@/providers/TanstackProvider";
import GlobalSnackbarProvider from "@/providers/GlobalSnackbarProvider";
import CurrencyProvider from "@/providers/CurrencyProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import HomePopUp from "@/components/common/home-popup";

export const metadata: Metadata = generateMetadata({
  title: "WiseAdmit | Apply To Universities Worldwide",
  description:
    "WiseAdmit is an all-in-one platform for international students to instantly find scholarships, best-fit programs, and universities worldwide.",
  endPoint: "/",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainLayoutScript />
        <GlobalSnackbarProvider>
          <NextAuthProvider>
            <ReduxProvider>
              <CurrencyProvider>
                <TanstackProvider>{children}</TanstackProvider>
              </CurrencyProvider>
            </ReduxProvider>
          </NextAuthProvider>
        </GlobalSnackbarProvider>
      </body>
    </html>
  );
}
