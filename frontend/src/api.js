const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function getToken() {
  return localStorage.getItem('eljefe_token');
}

async function request(method, path, body) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || 'Request failed'), { status: res.status, data });
  return data;
}

export const api = {
  // Auth
  register: (name, email, password) => request('POST', '/api/auth/register', { name, email, password }),
  login: (email, password) => request('POST', '/api/auth/login', { email, password }),
  me: () => request('GET', '/api/auth/me'),

  // Odds
  getOdds: () => request('GET', '/api/odds'),
  getSports: () => request('GET', '/api/odds/sports'),

  // Subscriptions
  getPlans: () => request('GET', '/api/subscriptions/plans'),
  upgrade: (tier, billing) => request('POST', '/api/subscriptions/upgrade', { tier, billing }),
  cancel: () => request('POST', '/api/subscriptions/cancel'),
};
