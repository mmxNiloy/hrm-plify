"use server";

import executeRequest from "../network/request-builder.service";
import {
  IFingerprintDevice,
  IFingerprintDeviceEmployee,
} from "./figerprint-device.schema";

interface InputProps {
  serialNum: string;
  internalId: string;
  employee_id: number;
}

export default async function deleteFingerprintDeviceUser({
  serialNum,
  internalId,
  employee_id,
}: InputProps) {
  return await executeRequest<IFingerprintDeviceEmployee>({
    method: "DELETE",
    endpoint: ["v2", "attendance", "fingerprint", "employee"].join("/"),
    authenticate: true,
    query: [
      ["serialNum", serialNum],
      ["internalId", internalId],
      ["employee_id", employee_id.toString()],
    ],
  });
}
