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

  const headers = new Headers(init?.headers);

  // Attach Workspace ID for multi-tenant backend architecture
  if (typeof window !== 'undefined') {
    const workspaceId = localStorage.getItem('activeWorkspaceId');
    if (workspaceId) {
      headers.set(WORKSPACE_HEADER, workspaceId);
    }

    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  // Ensure content type is JSON by default
  if (!headers.has('Content-Type') && !(init?.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(url, {
    ...init,
    headers,
  });
}
