import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DariCheck - Inspection Immobilière au Maroc",
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
      <body className={`${playfair.variable} ${dmSans.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
