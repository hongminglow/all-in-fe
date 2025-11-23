import ky from "ky";
import type { TApiResponse } from "~/types/services";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export const serverApi = ky.create({
  prefixUrl: BASE_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        // keep logging simple to avoid unused variable lint errors
        console.log("[serverApi] before request", request.method, request.url);
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        // attempt to parse JSON body for debugging; if not JSON, just log status
        try {
          const data = await response.clone().json();
          console.log("[serverApi] after response", response.status, data);
        } catch {
          console.log("[serverApi] after response (non-json)", response.status);
        }
      },
    ],
  },
});

type KyInput = Parameters<typeof serverApi>[0];
type KyInit = Parameters<typeof serverApi>[1];

export async function apiJson<TData>(input: KyInput, init?: KyInit) {
  return serverApi(input, init).json<TApiResponse<TData>>();
}

export async function apiData<TData>(input: KyInput, init?: KyInit) {
  const response = await apiJson<TData>(input, init);
  return response.data;
}
