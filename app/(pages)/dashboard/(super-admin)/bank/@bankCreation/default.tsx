"use server";
import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import { Button } from "@/components/ui/button";
import { BanknoteArrowUp, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function BankCreationSlot() {
  const mPermissions = await getCurrentUserPermissions();
  const writePermission = mPermissions?.find(
    (item) => item === "cmp_bank_create"
  );

  if (!writePermission) {
    return null;
  }

  return (
    <Link href="./bank/new">
      <Button variant={"gradient"} size="sm">
        <Plus />
        Create
      </Button>
    </Link>
  );
}
