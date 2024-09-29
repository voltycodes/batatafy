import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://batatafy.vercel.app/'),
  title: "batata-fy 🥔",
  description: "welcome to the batata battalion my friend",
  openGraph: {
    type: "website",
    url: "https://batatafy.vercel.app",
    title: "batata-fy 🥔",
    description: "welcome to the batata battalion my friend",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@voltycodes",
    title: "batata-fy 🥔",
    description: "welcome to the batata battalion my friend",
    images: "/og-image.png",
  },
};

export const viewport: Viewport = {
  themeColor: 'black',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
