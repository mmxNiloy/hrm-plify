export async function withError<T>(response: Promise<Response>) {
  try {
    const apiRes = await response;
    if (apiRes.ok) {
      const data = (await apiRes.json()) as T;

      return { data };
    }

    const apiError = await apiRes.json();

    return {
      error: new Error(apiError.message, {
        cause: JSON.stringify(apiError),
      }),
    };
  } catch (error) {
    if (error instanceof Error) return { error };
    else
      return {
        error: new Error("Unknown Error"),
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
      error: new Error(apiError.message, {
        cause: JSON.stringify(apiError),
      }),
    };
  } catch (error) {
    if (error instanceof Error) return { error };
    else
      return {
        error: new Error("Unknown Error"),
      };
  }
}
