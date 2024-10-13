import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/providers/Providers";
import SiteConfig from "@/utils/SiteConfig";
import Navbar from "@/components/custom/Navbar/Navbar";
import DashboardNavbar from "@/components/custom/Dashboard/Navbar/DashboardNavbar";

const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SiteConfig.siteName,
  description: SiteConfig.siteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          nunito.className
        )}
      >
        <Providers>
          <div
            className={cn(
              "relative flex flex-col bg-no-repeat bg-center bg-cover",
              nunito.className
            )}
          >
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
