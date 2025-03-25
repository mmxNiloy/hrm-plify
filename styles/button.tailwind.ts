import { cn } from "@/lib/utils";

export const ButtonBase = cn("rounded-full gap-1");
export const ButtonBlue = cn(
  ButtonBase,
  "bg-blue-500 hover:bg-blue-400 text-white"
);
export const ButtonGradient = cn(
  ButtonBase,
  "bg-site-gradient-lr drop-shadow-md hover:drop-shadow-lg text-white"
);
export const ButtonSuccess = cn(
  ButtonBase,
  "bg-green-500 hover:bg-green-400 text-white"
);
export const ButtonWarn = cn(
  ButtonBase,
  "bg-amber-500 hover:bg-amber-400 text-white"
);
