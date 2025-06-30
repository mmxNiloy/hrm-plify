"use server";

import executeRequest from "../network/request-builder.service";
import { IFingerprintDevice } from "./figerprint-device.schema";

interface InputProps {
  employee_id: number;
  serialNum: string;
  internalId: string;
}

export default async function registerFingerprintUser(data: InputProps) {
  return await executeRequest<IFingerprintDevice>({
    method: "POST",
    endpoint: ["v2", "attendance", "fingerprint", "employee"].join("/"),
    authenticate: true,
    body: JSON.stringify(data),
  });
}
