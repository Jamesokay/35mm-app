import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import HeaderNav from "./ui/components/HeaderNav";
import { ImageConfigProvider } from "./context/ImageConfigContext";
import { fetchConfig } from "./lib/actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "35mm",
  description: "Film and TV Database",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const imageConfig = await fetchConfig();
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ImageConfigProvider config={imageConfig}>
          <HeaderNav />
          {children}
        </ImageConfigProvider>
      </body>
    </html>
  );
}
