export const API_URL = import.meta.env.VITE_API_URL;

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
  localStorage.setItem('auth_user', JSON.stringify(data.user));
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

export interface Expense {
  id: string;
  trip_id: string;
  title: string;
  total_amount: string;
  currency: string;
  date: string;
  paid_by: number;
  created_at: string;
  updated_at: string;
}

export async function getTripExpenses(tripId: string): Promise<Expense[]> {
  const res = await authFetch(`${API_URL}/trips/${tripId}/expenses`);
  if (!res.ok) throw new Error('Failed to fetch expenses');
  return res.json();
}

export async function createExpense(tripId: string, data: { title: string; total_amount: number; currency: string; paid_by: number; splits: number[] }): Promise<Expense> {
  const res = await authFetch(`${API_URL}/trips/${tripId}/expenses`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.text();
    console.error('Create expense error:', res.status, error);
    throw new Error('Failed to create expense');
  }
  return res.json();
}

export async function createTrip(data: { title: string; destination: string; start_date: string; end_date: string; budget_amount: number; budget_currency: string }): Promise<Trip> {
  const res = await authFetch(`${API_URL}/trips`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.text();
    console.error('Create trip error:', res.status, error);
    throw new Error('Failed to create trip');
  }
  return res.json();
}

// Tasks

export interface ApiTask {
  id: string;
  trip_id: string;
  title: string;
  status: string;
  importance: string;
  assigned_to: number | null;
  due_date: string | null;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export async function getTripTasks(tripId: string): Promise<ApiTask[]> {
  const res = await authFetch(`${API_URL}/trips/${tripId}/tasks`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function createTask(tripId: string, data: { title: string; status: string; importance: string; assigned_to?: number | null }): Promise<ApiTask> {
  const res = await authFetch(`${API_URL}/trips/${tripId}/tasks`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.text();
    console.error('Create task error:', res.status, error);
    throw new Error('Failed to create task');
  }
  return res.json();
}

export async function updateTask(tripId: string, taskId: string, data: Partial<{ title: string; status: string; importance: string; assigned_to: number | null }>): Promise<ApiTask> {
  const res = await authFetch(`${API_URL}/trips/${tripId}/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.text();
    console.error('Update task error:', res.status, error);
    throw new Error('Failed to update task');
  }
  return res.json();
}

export async function deleteTask(tripId: string, taskId: string): Promise<void> {
  const res = await authFetch(`${API_URL}/trips/${tripId}/tasks/${taskId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete task');
}

// Plan

export interface PlanItem {
  id: string;
  trip_id: string;
  title: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export async function getTripPlan(tripId: string): Promise<PlanItem[]> {
  const res = await authFetch(`${API_URL}/trips/${tripId}/plan`);
  if (!res.ok) throw new Error('Failed to fetch plan');
  return res.json();
}

export async function createPlanItem(tripId: string, data: { title: string; date: string }): Promise<PlanItem> {
  const res = await authFetch(`${API_URL}/trips/${tripId}/plan`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.text();
    console.error('Create plan error:', res.status, error);
    throw new Error('Failed to create plan item');
  }
  return res.json();
}

export async function updatePlanItem(tripId: string, planId: string, data: { title: string; date: string }): Promise<PlanItem> {
  const res = await authFetch(`${API_URL}/trips/${tripId}/plan/${planId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update plan item');
  return res.json();
}

export async function deletePlanItem(tripId: string, planId: string): Promise<void> {
  const res = await authFetch(`${API_URL}/trips/${tripId}/plan/${planId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete plan item');
}

// User

export interface User {
  id: number;
  name: string;
  email: string;
  default_timezone: string;
  created_at: string;
  updated_at: string;
}

export function getMe(): User | null {
  const saved = localStorage.getItem('auth_user');
  return saved ? JSON.parse(saved) : null;
}

export async function getDashboard(): Promise<DashboardData> {
  const res = await authFetch(`${API_URL}/dashboard`);
  if (!res.ok) throw new Error('Failed to fetch dashboard');
  return res.json();
}
