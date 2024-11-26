"use client";

import { usePathname, useRouter } from "next/navigation";

export default function RotaDashboardPage() {
  const pathname = usePathname();
  const router = useRouter();
  router.replace(pathname.concat("/shift"));
}
