import { useCallback, useMemo, useRef, useState } from "react";

import { ApiError, apiFetch, type ApiFetchOptions } from "@/lib/api";

type UseFetchState<T> = {
  data: T | null;
  error: ApiError | null;
  loading: boolean;
};

export type UseFetchReturn<T> = UseFetchState<T> & {
  request: (opts: ApiFetchOptions) => Promise<T>;
  reset: () => void;
  abort: () => void;
};

export function useFetch<T = unknown>(): UseFetchReturn<T> {
  const abortRef = useRef<AbortController | null>(null);
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const abort = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, error: null, loading: false });
  }, []);

  const request = useCallback(async (opts: ApiFetchOptions) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState((s) => ({ ...s, loading: true, error: null }));

    try {
      const result = await apiFetch<T>({
        ...opts,
        signal: controller.signal,
      });
      setState({ data: result, error: null, loading: false });
      return result;
    } catch (err) {
      const apiErr =
        err instanceof ApiError
          ? err
          : new ApiError("Unexpected error.", { code: "NETWORK_ERROR", details: err });
      setState((s) => ({ ...s, error: apiErr, loading: false }));
      throw apiErr;
    }
  }, []);

  return useMemo(
    () => ({
      ...state,
      request,
      reset,
      abort,
    }),
    [abort, request, reset, state],
  );
}

