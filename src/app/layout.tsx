import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Immo Verify Maroc - Inspection Immobilière au Maroc",
  description: "Achetez au Maroc les yeux ouverts. Inspection professionnelle de propriétés immobilières par des ingénieurs certifiés.",
  keywords: "inspection immobilière, Morocco, real estate, property inspection, achat maison",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
