/* eslint-disable @typescript-eslint/no-explicit-any */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/v1";

type APIOptions = Omit<RequestInit, "body"> & { body?: any };

export async function api<T = any>(path: string, opts: APIOptions = {}) {
  const url = `${API_BASE}${path}`;
  const headers: Record<string, string> = {
    ...(opts.headers as Record<string, string> | undefined),
  };

  if (opts.body && !(opts.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, {
    method: opts.method || "GET",
    credentials: "include",
    headers,
    body:
      opts.body && !(opts.body instanceof FormData)
        ? JSON.stringify(opts.body)
        : opts.body,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = (data && (data.message || data.error)) || res.statusText;
    const err: any = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data as T;
}
