"use client";

import { Toaster } from "@/components/ui/toaster";
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
      {/* <TailwindIndicator /> */}
      {/* </LanguageContextProvider> */}
    </ThemeProvider>
    // </UserContextProvider>
  );
}
