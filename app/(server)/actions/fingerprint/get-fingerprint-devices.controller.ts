"use server";

import executeRequest from "../network/request-builder.service";
import { IFingerprintDevice } from "./figerprint-device.schema";

interface InputProps {
  companyId: string;
  page?: number;
  limit?: number;
}

export default async function getFingerprintDevices({
  companyId,
  page = 1,
  limit = 10,
}: InputProps) {
  return await executeRequest<IFingerprintDevice[]>({
    method: "GET",
    endpoint: ["v2", "attendance", "fingerprint", companyId].join("/"),
    authenticate: true,
  });
}
