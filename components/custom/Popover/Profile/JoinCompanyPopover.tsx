"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { ButtonGradient } from "@/styles/button.tailwind";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import AnimatedTrigger from "../AnimatedTrigger";
import { WIPToastOptions } from "@/utils/Misc";
import { IUser } from "@/schema/UserSchema";

export default function JoinCompanyPopover({
  user,
  className,
}: {
  user: IUser;
  className?: string;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const fd = new FormData(e.currentTarget);

      setLoading(true);

      toast(WIPToastOptions);

      setLoading(false);
    },
    [toast]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <AnimatedTrigger
          className={cn(
            "w-full shadow-lg bg-green-500 hover:bg-green-400",
            className
          )}
          Icon={<Icons.userPlus className="size-4 sm:size-5" />}
          label="Join a Company"
        />
      </PopoverTrigger>

      <PopoverContent
        align="center"
        onInteractOutside={(e) => {
          if (loading) {
            e.preventDefault();
          }
        }}
        className="w-[90vw] max-w-md sm:max-w-lg p-4 sm:p-5"
      >
        <form onSubmit={handleSubmit}>
          <div className="sr-only">
            <Input
              name="user_id"
              defaultValue={user.user_id}
              key={`user-id-${user.user_id}`}
            />
          </div>

          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="w-full flex flex-col gap-2">
              <Label className={cn(RequiredAsterisk, "text-sm sm:text-base")}>
                Invitation Link
              </Label>
              <Input
                required
                name="invitation_link"
                placeholder="Invitation Link"
                className="text-sm sm:text-base"
              />
            </div>

            <Button
              className={cn(ButtonGradient, "w-full text-sm sm:text-base")}
              type="submit"
              disabled={loading}
              title="Join"
            >
              <Icons.check className="size-4 sm:size-5 mr-2" /> Join
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
