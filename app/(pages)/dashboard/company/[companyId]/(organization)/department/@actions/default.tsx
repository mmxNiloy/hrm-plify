"use server";

import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import React from "react";
import { Actions } from "../features/actions";

export default async function PageActions({ params }: CompanyIDURLParamSchema) {
  const mParams = await params;
  const companyId = mParams.companyId;
  return <Actions companyId={companyId} />;
}
