export interface FetchRequest<Req> {
  path: string;
  data?: Req;
  query?: { [key: string]: string | number };
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  headers?: RequestInit['headers'];
  options?: RequestInit;
  token?: string;
}

async function fetcher<Res, Req = never>({
  path,
  data,
  query,
  method = 'GET',
  headers = {},
  options,
  token,
}: FetchRequest<Req>): Promise<Res> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const url = new URL(`${apiURL}${path}`);

  if (query) {
    Object.keys(query).forEach((key) =>
      url.searchParams.append(key, query[key].toString())
    );
  }

  const authHeaders: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const response = await fetch(url.href, {
    method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...(headers as Record<string, string>),
    },
    ...options,
  });

  if (!response.ok) {
    let errorMessage = `HTTP error! Status: ${response.status}`;
    try {
      const errBody = await response.json();
      errorMessage = errBody.error ?? errorMessage;
    } catch { /* ignore */ }
    throw new Error(errorMessage);
  }

  return response.json();
}

export default fetcher;
