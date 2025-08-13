import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";
import { AppShell } from "@/components/AppShell";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const sourceSerif = Source_Serif_4({ variable: "--font-serif", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Khirfan AI Command Center",
  description: "Powered by Qualia Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sourceSerif.variable} antialiased`}>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
