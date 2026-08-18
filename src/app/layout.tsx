import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import QueryProvider from "@/providers/QueryProvider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Multiverse Explorer",
  description: "Explore characters and episodes from the Rick and Morty universe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
  <ReactQueryProvider>
    {children}
  </ReactQueryProvider>
</body>
    </html>
  );
}