"use server";

import executeRequest from "../network/request-builder.service";
import { IFingerprintDevice } from "./figerprint-device.schema";

interface InputProps {
  companyId: string;
  serialNum: string;
}

export default async function createFingerprintDevice({
  companyId,
  serialNum,
}: InputProps) {
  return await executeRequest<IFingerprintDevice>({
    method: "POST",
    endpoint: ["v2", "attendance", "fingerprint", companyId].join("/"),
    authenticate: true,
    body: JSON.stringify({ serialNum }),
  });
}
