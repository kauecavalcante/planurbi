// Arquivo: src/app/layout.tsx (ATUALIZADO)

import type { Metadata } from "next";
import { Anek_Devanagari, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext"; // 1. Importe o AuthProvider

// Suas configurações de fonte originais
const anek = Anek_Devanagari({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-heading", // Mantendo sua variável --font-heading
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body", // Mantendo sua variável --font-body
});

export const metadata: Metadata = {
  title: "PlanUrbi",
  description: "Planejamento urbano integrado para uma cidade mais inclusiva, moderna e eficiente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Aplicando as classes de fonte no <html> para garantir que as variáveis estejam disponíveis globalmente
    <html lang="pt-BR" className={`${anek.variable} ${inter.variable}`}>
      <head>
        {/* Você pode manter links específicos aqui, como o de ícones */}
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </head>
      <body>
        {/* 2. Envolva o {children} com o AuthProvider */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}