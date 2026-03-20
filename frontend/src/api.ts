const API_URL = import.meta.env.VITE_API_URL;

export interface Trip {
  id: string;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  cover_image_url: string | null;
  budget_amount: string;
  budget_currency: string;
  created_at: string;
  updated_at: string;
}

export interface Member {
  id: number;
  name: string;
  email: string;
  pivot: {
    trip_id: string;
    user_id: number;
    role: string;
  };
}

export interface DashboardData {
  trips: Trip[];
  notifications: unknown[];
  deadlines: unknown[];
}

// Auth

async function login(): Promise<string> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@example.com', password: 'password123' }),
  });
  if (!res.ok) throw new Error('Login failed');
  const data = await res.json();
  const token = data.token;
  localStorage.setItem('auth_token', token);
  return token;
}

async function getToken(): Promise<string> {
  const token = localStorage.getItem('auth_token');
  if (token) return token;
  return login();
}

async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = await getToken();
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });
  // If 401 — token expired, re-login and retry
  if (res.status === 401) {
    localStorage.removeItem('auth_token');
    const newToken = await login();
    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${newToken}`,
        ...options.headers,
      },
    });
  }
  return res;
}

// Trips

export async function getTrip(tripId: string): Promise<Trip> {
  const res = await authFetch(`${API_URL}/trips/${tripId}`);
  if (!res.ok) throw new Error('Failed to fetch trip');
  return res.json();
}

export async function updateTrip(tripId: string, data: Partial<Pick<Trip, 'title' | 'destination' | 'start_date' | 'end_date' | 'budget_amount' | 'budget_currency'>>): Promise<Trip> {
  const res = await authFetch(`${API_URL}/trips/${tripId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.text();
    console.error('Update trip error:', res.status, error);
    throw new Error('Failed to update trip');
  }
  return res.json();
}

export async function getTripMembers(tripId: string): Promise<Member[]> {
  const res = await authFetch(`${API_URL}/trips/${tripId}/members`);
  if (!res.ok) throw new Error('Failed to fetch members');
  return res.json();
}

// Dashboard

export async function getDashboard(): Promise<DashboardData> {
  const res = await authFetch(`${API_URL}/dashboard`);
  if (!res.ok) throw new Error('Failed to fetch dashboard');
  return res.json();
}
