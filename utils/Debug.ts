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
        }) as { message: string },
      };
    else
      return {
        error: { message: "Unknown Error" },
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
      },
    };
  } catch (error) {
    if (error instanceof Error)
      return {
        error: new Object({
          message: error.message,
        }) as { message: string },
      };
    else
      return {
        error: { message: "Unknown Error" },
      };
  }
}
