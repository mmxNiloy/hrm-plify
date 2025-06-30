"use server";

import executeRequest from "../network/request-builder.service";
import {
  IFingerprintDevice,
  IFingerprintDeviceEmployee,
} from "./figerprint-device.schema";

interface InputProps {
  serialNum: string;
  page?: number;
  limit?: number;
}

export default async function getFingerprintDeviceEmployees({
  serialNum,
  page = 1,
  limit = 10,
}: InputProps) {
  return await executeRequest<IFingerprintDeviceEmployee[]>({
    method: "GET",
    endpoint: ["v2", "attendance", "fingerprint", "device", serialNum].join(
      "/"
    ),
    authenticate: true,
    query: [
      ["page", page.toString()],
      ["limit", limit.toString()],
    ],
  });
}
