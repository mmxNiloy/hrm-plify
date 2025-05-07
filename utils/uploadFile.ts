import { IUploadResult } from "@/app/(server)/actions/upload";

export default async function uploadFile(
  file: File
): Promise<{ ok: true; data: IUploadResult } | { ok: false; error: any }> {
  try {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    if (res.ok) {
      const mRes = (await res.json()) as IUploadResult;
      return { ok: true, data: mRes };
    } else {
      var mRes = undefined;
      if (res.headers.get("Content-Type")?.includes("json")) {
        mRes = await res.json();
      } else {
        mRes = {message: await res.text()};
      }

      console.error("Upload failed! Error:", mRes);
      return { ok: false, error: mRes };
    }
  } catch (error) {
    console.error("Upload failed! Error:", error);
    return { ok: false, error };
  }
}
