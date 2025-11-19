const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);

  localStorage.setItem("token", data.token);
}

export async function register(username: string, password: string) {
  await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),   
  });
}

export function logout() {
  localStorage.removeItem("token");
}
