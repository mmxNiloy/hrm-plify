import { cn } from "@/lib/utils";
import SiteConfig from "@/utils/SiteConfig";

export const RequiredAsterisk = cn(
  "after:content-['*'] after:text-red-500 after:ml-1"
);

export const FileSizeWarning = cn(
  `after:text-amber-500 after:ml-2 after:content-['(Max_${
    SiteConfig.maxFileSize / 1e6
  }MB)']`
);
