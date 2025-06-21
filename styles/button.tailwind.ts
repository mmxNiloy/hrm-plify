import { cn } from "@/lib/utils";

export const ButtonBase = cn(
  "rounded-full gap-1 drop-shadow-sm hover:drop-shadow-lg"
);
export const ButtonBlue = cn(
  ButtonBase,
  "bg-blue-500 hover:bg-blue-400 text-white"
);
export const ButtonGradient = cn(
  ButtonBase,
  "from-[#bd1cc2] to-[#f5561c] bg-gradient-to-r drop-shadow-md hover:from-[#fa662c] hover:to-[#cd3cd2] text-white"
);
export const ButtonSuccess = cn(
  ButtonBase,
  "bg-green-500 hover:bg-green-400 text-white"
);
export const ButtonWarn = cn(
  ButtonBase,
  "bg-amber-500 hover:bg-amber-400 text-white"
);
