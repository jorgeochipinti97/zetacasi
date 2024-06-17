import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
export const metadata = {
  title: "Zeta Casino",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

      </Head>
      <body className={inter.className}>
        <Toaster />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
