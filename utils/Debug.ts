export async function withError<T>(response: Promise<Response>) {
  try {
    const apiRes = await response;
    if (apiRes.ok) {
      const data = (await apiRes.json()) as T;

      return { data };
    }

    const apiError = await apiRes.json();

    throw new Error(
      apiError.message ?? apiError.error ?? JSON.stringify(apiError),
      {
        cause: JSON.stringify(apiError),
      }
    );
  } catch (error) {
    if (error instanceof Error)
      return {
        error: new Object({
          message: error.message,
          name: "",
          cause: "",
          stack: "",
        }) as {
          message: string;
          name: string;
          cause: string;
          stack: string;
        },
      };
    else
      return {
        error: { message: "Unknown Error", name: "", cause: "", stack: "" },
      };
  }
}

export async function withTextDataError(response: Promise<Response>) {
  try {
    const apiRes = await response;
    if (apiRes.ok) {
      const data = await apiRes.text();

      return { data };
    }

    const apiError = await apiRes.json();

    return {
      error: {
        message: apiError.message ?? apiError.error ?? JSON.stringify(apiError),
        name: "",
        cause: "",
        stack: "",
      },
    };
  } catch (error) {
    if (error instanceof Error)
      return {
        error: new Object({
          message: error.message,
          name: "",
          cause: "",
          stack: "",
        }) as {
          message: string;
          name: string;
          cause: string;
          stack: string;
        },
      };
    else
      return {
        error: { message: "Unknown Error", name: "", cause: "", stack: "" },
      };
  }
}
