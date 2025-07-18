import type { Metadata } from "next";
import { Anek_Devanagari, Inter } from "next/font/google";
import "./globals.css";

const anek = Anek_Devanagari({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "PlanUrbi - Barra de São Miguel",
  description: "Planejamento urbano integrado para uma cidade mais inclusiva, moderna e eficiente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </head>
      <body className={`${anek.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}