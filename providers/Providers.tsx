"use client";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import TailwindIndicator from "@/providers/TailwindIndicator";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider } from "@/providers/ThemeProvider";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    // <UserContextProvider>
    <ThemeProvider attribute="class" defaultTheme="light">
      {/* <LanguageContextProvider> */}
      <NuqsAdapter>{children}</NuqsAdapter>
      <Toaster />
      <SonnerToaster />
      {/* <TailwindIndicator /> */}
      {/* </LanguageContextProvider> */}
    </ThemeProvider>
    // </UserContextProvider>
  );
}
