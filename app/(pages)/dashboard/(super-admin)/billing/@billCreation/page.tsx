"use server";
import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import { Button } from "@/components/ui/button";
import { BanknoteArrowUp } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function BillCreationSlot() {
  const mPermissions = await getCurrentUserPermissions();
  const writePermission = mPermissions?.find(
    (item) => item === "sys_billing_create"
  );

  if (!writePermission) {
    return null;
  }

  return (
    <Link href="./billing/new">
      <Button variant={"gradient"} size="sm">
        <BanknoteArrowUp />
        Create
      </Button>
    </Link>
  );
}
