import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    toast.error(data.error || "Login failed");
    throw new Error(data.error);
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.username);

  toast.success("Logged in successfully!");
  return data;
}

export async function register(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    toast.error(data.error || "Registration failed");
    throw new Error(data.error);
  }

  toast.success("Account created — Signing you in...");

  // Auto login after register
  await login(username, password);

  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  toast.success("Logged out!");
}
