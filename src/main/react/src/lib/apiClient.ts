export const WORKSPACE_HEADER = 'X-Workspace-Id';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * A wrapper around native fetch that automatically attaches the active Workspace ID and Auth token.
 * Use this for all API calls to the backend to support multi-tenant data access.
 */
export async function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  let url = input;
  if (typeof input === 'string' && input.startsWith('/')) {
    url = `${BASE_URL}${input}`;
  }

  const headers: Record<string, string> = {};

  if (init?.headers) {
    if (init.headers instanceof Headers) {
      init.headers.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (Array.isArray(init.headers)) {
      init.headers.forEach(([key, value]) => {
        headers[key] = value;
      });
    } else {
      Object.assign(headers, init.headers);
    }
  }

  // Attach Workspace ID for multi-tenant backend architecture
  if (typeof window !== 'undefined') {
    const workspaceId = localStorage.getItem('activeWorkspaceId');
    if (workspaceId) {
      headers[WORKSPACE_HEADER] = workspaceId;
    }

    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  // Ensure content type is JSON by default
  if (!headers['Content-Type'] && !(init?.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  return fetch(url, {
    ...init,
    headers,
  });
}
