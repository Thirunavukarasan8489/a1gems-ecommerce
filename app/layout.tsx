import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "@/components/public/cart/cart-provider";
import "./globals.css";

// Display face for headings — high-contrast serif, reads as jewellery.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

// UI face — geometric, wide apertures, holds up at small mobile sizes.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://a1gems.in"),
  title: {
    default: "A1 Gems — Certified Natural Gemstones",
    template: "%s · A1 Gems",
  },
  description:
    "Natural, independently certified gemstones sourced at origin. Ruby, blue sapphire, yellow sapphire, emerald, pearl and coral with GIA, IGI and GRS reports. Free gemmologist consultation.",
  keywords: [
    "certified gemstones",
    "natural ruby",
    "blue sapphire neelam",
    "yellow sapphire pukhraj",
    "emerald panna",
    "buy gemstones online india",
  ],
  openGraph: {
    type: "website",
    siteName: "A1 Gems",
    locale: "en_IN",
    title: "A1 Gems — Certified Natural Gemstones",
    description:
      "Natural, independently certified gemstones sourced at origin. Treatments always disclosed.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Never trap users at 100% — pinch-zoom is an accessibility requirement.
  maximumScale: 5,
  themeColor: "#130b1b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
