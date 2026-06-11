import type { Metadata } from "next";
import { Cinzel, Josefin_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nirvanabuilders.in"),
  title: "Nirvana Builders & Developers | Constructions & Luxury Interior",
  description: "Bespoke constructions and luxury interior design services. Elevating spaces into living masterpieces.",
  keywords: ["luxury interior design", "premium builders", "bespoke interiors", "Nirvana Builders", "construction", "architects"],
  openGraph: {
    title: "Nirvana Builders & Developers | Constructions & Luxury Interior",
    description: "Bespoke constructions and luxury interior design services. Elevating spaces into living masterpieces.",
    url: "https://nirvanabuilders.in",
    siteName: "Nirvana Builders & Developers",
    images: [{ url: "/quiz-quiet-luxury.png", width: 1200, height: 630, alt: "Nirvana Luxury Interior Design" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirvana Builders & Developers | Constructions & Luxury Interior",
    description: "Bespoke constructions and luxury interior design services. Elevating spaces into living masterpieces.",
    images: ["/quiz-quiet-luxury.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${josefinSans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground select-none">
        {children}
      </body>
    </html>
  );
}
