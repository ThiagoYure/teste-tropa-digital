import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import GlobalStyle from '../styles/GlobalStyle';
import StyledComponentsRegistry from "./registry";
import { PageTransitionLoader } from "@/components/PageTransitionLoader";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Tropa Digital - Teste Frontend",
  description: "Desenvolvido por Thiago Yure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable}`}>
        <StyledComponentsRegistry>
          <GlobalStyle/>
          <PageTransitionLoader />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
