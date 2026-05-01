const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | object | null;
};

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;

  const isJsonBody =
    body !== undefined && body !== null && typeof body === "object" && !(body instanceof FormData);

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      Accept: "application/json",
      ...(isJsonBody ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: isJsonBody ? JSON.stringify(body) : body,
  });

  if (!res.ok) {
    throw new Error(`API error: HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}
