import { cn } from "@/lib/utils";

export const ButtonBase = cn(
  "gap-1 drop-shadow-sm hover:drop-shadow-lg text-sm [&_svg]:size-5"
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
  "bg-yellow-500 hover:bg-yellow-400 text-white"
);
