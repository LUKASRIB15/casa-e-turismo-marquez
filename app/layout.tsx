import { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const cabinSans = Cabin({
  variable: "--font-cabin-sans",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Casa e Turismo Marquez - Imóveis em Canoa Quebrada",
  description:
    "Especialistas em imóveis de praia em Canoa Quebrada. Descubra casas e terrenos na região mais bela do Ceará.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${cabinSans.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
