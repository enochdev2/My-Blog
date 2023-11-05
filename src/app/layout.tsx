import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";import NextThemeProvider from "../Provider/ThemeProvider";
import Footer from "@/components/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-transparent ">
        <NextThemeProvider>
        <Navbar />
        {children}
        <Footer />
        </NextThemeProvider>
      </body>
    </html>
  );
}
