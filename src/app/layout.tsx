import type { Metadata } from "next";
import { Roboto, Comfortaa, Handlee, Vast_Shadow, Montserrat, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { Analytics } from "@vercel/analytics/next";
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
const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700"],
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
      <body
        className={`${roboto.variable} ${comfortaa.variable} ${handlee.variable} ${vast_shadow.variable} ${montserrat.variable} ${lato.variable} antialiased`}
      >
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3832681614268728"
     crossOrigin="anonymous"></script>
        {/* <Script src="https://api.tracker.krishkh.xyz/tracking.js"></Script> */}
        {/* Navbar */}
        <Analytics />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
