"use server";

import React from "react";
import { CompanyDetailViewSelect } from "../(ui)/components/";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";

export default async function ViewSelect({ params }: CompanyIDURLParamSchema) {
  const mParams = await params;
  const companyId = mParams.companyId;
  return <CompanyDetailViewSelect companyId={companyId} />;
}
