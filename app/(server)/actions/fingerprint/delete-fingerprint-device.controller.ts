"use server";

import executeRequest from "../network/request-builder.service";
import { IFingerprintDevice } from "./figerprint-device.schema";

interface InputProps {
  serialNum: string;
}

export default async function deleteFingerprintDevice({
  serialNum,
}: InputProps) {
  return await executeRequest<IFingerprintDevice>({
    method: "DELETE",
    endpoint: ["v2", "attendance", "fingerprint", serialNum].join("/"),
    authenticate: true,
  });
}
