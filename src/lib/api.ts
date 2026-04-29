import { toast } from "sonner";

export type ApiErrorCode =
  | "ABORTED"
  | "NETWORK_ERROR"
  | "HTTP_ERROR"
  | "PARSE_ERROR";

export class ApiError extends Error {
  readonly code: ApiErrorCode;
  readonly status?: number;
  readonly details?: unknown;

  constructor(
    message: string,
    opts: { code: ApiErrorCode; status?: number; details?: unknown },
  ) {
    super(message);
    this.name = "ApiError";
    this.code = opts.code;
    this.status = opts.status;
    this.details = opts.details;
  }
}

function isAbortError(err: unknown) {
  return (
    err instanceof DOMException &&
    (err.name === "AbortError" || err.code === 20)
  );
}

function joinUrl(baseUrl: string, path: string) {
  if (!baseUrl) return path;
  if (!path) return baseUrl;
  return `${baseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

function defaultBaseUrl() {
  // Prefer a single env var for all environments, but keep it optional.
  return import.meta.env.VITE_API_URL ?? "";
}

async function readBodySafely(res: Response): Promise<unknown> {
  const contentType = res.headers.get("content-type") ?? "";
  if (res.status === 204) return null;

  if (contentType.includes("application/json")) {
    try {
      return await res.json();
    } catch (err) {
      throw new ApiError("Failed to parse JSON response.", {
        code: "PARSE_ERROR",
        status: res.status,
        details: err,
      });
    }
  }

  // Fallback for text/* and unknown types (helps debug backend errors)
  try {
    const text = await res.text();
    return text.length ? text : null;
  } catch {
    return null;
  }
}

function getMessageFromUnknownBody(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const maybe = body as Record<string, unknown>;
  if (typeof maybe.message === "string" && maybe.message.trim().length) {
    return maybe.message;
  }
  return null;
}

export type ApiFetchOptions = Omit<RequestInit, "body" | "headers"> & {
  baseUrl?: string;
  path: string;
  query?: Record<string, string | number | boolean | null | undefined>;
  headers?: HeadersInit;
  body?: unknown;
};

export async function apiFetch<T>(opts: ApiFetchOptions): Promise<T> {
  const baseUrl = opts.baseUrl ?? defaultBaseUrl();
  const url = new URL(joinUrl(baseUrl, opts.path), window.location.origin);

  if (opts.query) {
    for (const [k, v] of Object.entries(opts.query)) {
      if (v === null || v === undefined) continue;
      url.searchParams.set(k, String(v));
    }
  }

  const headers = new Headers(opts.headers);
  const hasBody = opts.body !== undefined;
  if (hasBody && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  if (!headers.has("accept")) {
    headers.set("accept", "application/json");
  }

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      ...opts,
      headers,
      body: hasBody ? JSON.stringify(opts.body) : undefined,
      // credentials: "include",
    });
  } catch (err) {
    console.log(err);
    if (isAbortError(err)) {
      throw new ApiError("Request was aborted.", { code: "ABORTED" });
    }
    throw new ApiError("Network error while calling the API.", {
      code: "NETWORK_ERROR",
      details: err,
    });
  }

  const parsed = await readBodySafely(res);

  if (!res.ok) {
    const message =
      getMessageFromUnknownBody(parsed) ??
      `Request failed with status ${res.status}.`;

    toast.error(message);
    throw new ApiError(message, {
      code: "HTTP_ERROR",
      status: res.status,
      details: parsed,
    });
  }

  return parsed as T;
}
