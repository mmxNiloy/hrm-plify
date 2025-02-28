"use client";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/providers/Providers";
import SiteConfig from "@/utils/SiteConfig";
import VersionIndicator from "@/components/custom/VersionIndicator";
import { Suspense } from "react";
import Navbar from "@/components/custom/Navbar/Navbar";
import Footer from "@/components/custom/Footer";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased scroll-smooth scroll-m-16",
          nunito.className
        )}
      >
        <Providers>
          <div
            className={cn(
              "min-h-screen relative flex flex-col bg-no-repeat bg-center bg-cover",
              nunito.className
            )}
          >
            {!pathname.startsWith("/dashboard") && <Navbar />}
            {children}
            {!pathname.startsWith("/dashboard") && (
              <Suspense fallback={<p>Loading...</p>}>
                <Footer />
              </Suspense>
            )}
          </div>
        </Providers>
        {/* <div className="h-screen w-screen top-0 left-0 bottom-0 right-0 sticky bg-green-500/20 -z-10"></div> */}
        <Suspense>
          <VersionIndicator />
        </Suspense>
      </body>
    </html>
  );
}
