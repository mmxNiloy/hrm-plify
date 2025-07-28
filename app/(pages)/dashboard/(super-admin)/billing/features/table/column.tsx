"use client";

import { BillingSchema } from "@/schema/form/billing.schema";
import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

export const columns: ColumnDef<z.infer<typeof BillingSchema>>[] = [
  // TODO: Billing table columns here
];
