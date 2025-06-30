"use server";
import { cookies } from "next/headers";
import { ResponseBuilder } from "./ResponseBuilder";

interface RequestBuilderProps extends RequestInit {
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
  headers?: Record<string, string>;
}

export default async function executeRequest<T = unknown>(
  props: RequestBuilderProps
) {
  const { method, endpoint, authenticate, query, asFormData, headers, body } =
    props;

  try {
    if (!process.env.API_BASE_URL) {
      throw new Error("API URL Environment not set.", {
        cause: "Missing API_BASE_URL or API_VERSION in environment.",
      });
    }

    let token = "";
    if (authenticate) {
      const session =
        (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
      // console.debug("Session:", session);
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
      [process.env.API_BASE_URL, endpoint].join("/").concat(
        `?${query
          ?.filter((item) => item.length == 2)
          .map((item) => item.join("="))
          .join("&")}`
      ),
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

    const data = typeof result === "string" ? { message: result } : result;

    if (!response.ok) {
      return ResponseBuilder.error(data);
    }

    return ResponseBuilder.success<T>(data);
  } catch (error) {
    if (error instanceof Error)
      return ResponseBuilder.error({
        message: error.message,
        statusCode: 500,
        error: true,
        payload: undefined,
      });

    return ResponseBuilder.error({
      error: true,
      message: "An unknown error occured.",
      statusCode: 500,
      payload: undefined,
    });
  }
}
