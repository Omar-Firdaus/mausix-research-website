import type { Metadata, Viewport } from "next";
import { Libre_Barcode_128, Space_Grotesk, Syne } from "next/font/google";
import localFont from "next/font/local";
import { SiteSideRails } from "./components/SiteSideRails";
import { ScrollNav } from "./components/ScrollNav";
import { Footer } from "./components/Footer";
import "./globals.css";

const departureMono = localFont({
  src: "../public/fonts/DepartureMono-Regular.woff2",
  variable: "--font-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700", "800"],
});

const libreBarcode128 = Libre_Barcode_128({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-barcode",
});

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  title: "Mausix Research",
  description: "Industrial systems research and engineering.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${departureMono.variable} ${spaceGrotesk.variable} ${syne.variable} ${libreBarcode128.variable}`}>
        <SiteSideRails />
        <ScrollNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
