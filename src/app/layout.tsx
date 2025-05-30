import type { Metadata } from "next";
import { Roboto, Comfortaa, Handlee, Vast_Shadow } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});
const handlee = Handlee({
  variable: "--font-handlee",
  weight: "400",
  subsets: ["latin"],
});
const vast_shadow = Vast_Shadow({
  variable: "--font-shadow",
  weight: "400",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Krish Khanna",
  description: "A showcase of my work and words.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="http://localhost:8000/script" />
      </head>
      <body
        className={`${roboto.variable} ${comfortaa.variable} ${handlee.variable} ${vast_shadow.variable} antialiased`}
      >
        {/* Navbar */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
