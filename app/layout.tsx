import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import HeaderNav from "./ui/components/HeaderNav";
import { ImageConfigProvider } from "./context/ImageConfigContext";
import { fetchConfig } from "./lib/actions";
import { createServerClient } from "./utils/supabase/server";
import { SupabaseAuthContextProvider } from "./context/SupabaseAuthContext";

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
  const supabase = createServerClient();
  const { data } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ImageConfigProvider config={imageConfig}>
          <SupabaseAuthContextProvider user={data.user}>
            <HeaderNav />
            {children}
          </SupabaseAuthContextProvider>
        </ImageConfigProvider>
      </body>
    </html>
  );
}
