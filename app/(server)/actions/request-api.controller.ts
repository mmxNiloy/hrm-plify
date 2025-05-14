//@ts-nocheck
"use server";

import { cookies } from "next/headers";
import ActionResponseBuilder from "@/schema/class/ActionResponseBuilder";
import { IErrorResponseBase, IResponseBase } from "@/schema/base.schema";

interface RequestAPIProps extends RequestInit {
  method:
    | "GET"
    | "POST"
    | "PATCH"
    | "PUT"
    | "DELETE"
    | "HEAD"
    | "TRACE"
    | "CONNECT"
    | "OPTIONS";
  endpoint: string;
  authenticate?: boolean;
  query?: string[][];
  asFormData?: boolean;
}

export default async function requestAPI<T = IResponseBase>({
  method,
  endpoint,
  body,
  authenticate = false,
  query = [],
  headers,
  asFormData = false,
}: RequestAPIProps): Promise<
  { data: T; ok: true } | { ok: false; error: IErrorResponseBase }
> {
  const reqTime = new Date();
  try {
    console.debug(
      `[Request ${reqTime} | ${method}] > Actions > Begin Request API >`,
      {
        method,
        url: [process.env.API_BASE_URL, endpoint].join("/"),
        query,
        authenticate,
        body,
      }
    );

    if (!process.env.API_BASE_URL) {
      throw new Error("API URL Environment not set.", {
        cause: "Missing API_BASE_URL or API_VERSION in environment.",
      });
    }

    let token = "";
    if (authenticate) {
      const session =
        (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
      console.debug("Session:", session);
      if (!session || !session.length) {
        throw new Error("Token not found or has expired.", {
          cause: "Session not found or token expired. Please login again.",
        });
      }

      token = session;
    }

    const mHeaders = asFormData
      ? { Authorization: `Bearer ${token}`, ...headers }
      : {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...headers,
        };

    const response = await fetch(
      [process.env.API_BASE_URL, endpoint]
        .join("/")
        .concat(`?${query.map((item) => item.join("=")).join("&")}`),
      {
        method,
        headers: mHeaders,
        body,
      }
    );

    const contentType = response.headers.get("Content-Type");
    let result;
    if (contentType?.includes("json")) {
      result = await response.json();
    } else {
      result = await response.text();
    }

    console.debug(
      `[Request ${reqTime} | ${method}] > Actions > Request API > Response >`,
      result
    );
    console.debug(
      `[Request ${reqTime} | ${method}] > Actions > Request API > Status >`,
      response.status
    );

    if (!response.ok) {
      console.warn(
        `[Request ${reqTime} | ${method}] > Actions > Request API > API Responded with an error.`
      );
      return ActionResponseBuilder.error(result).toJSON();
    }

    console.debug(
      `[Request ${reqTime} | ${method}] > Actions > Request API > API Responded with a success.`
    );
    console.debug(
      `[Request ${reqTime} | ${method}] > Actions > End Request API`
    );

    return ActionResponseBuilder.success(result).toJSON();
  } catch (error) {
    console.error(
      `[Request ${reqTime} | ${method}] > Actions > Request API > Failed to make a request >`,
      error
    );

    if (error instanceof Error)
      return ActionResponseBuilder.error({
        error: true,
        message: error.message,
        statusCode: 500,
      }).toJSON();

    return ActionResponseBuilder.error({
      error: true,
      message: "An unknown error occured.",
      status: 500,
    }).toJSON();
  }
}
