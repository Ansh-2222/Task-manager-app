"use client";
import { useState } from "react";
import Link from "next/link";
import { login } from "@/services/authService";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();
    try {
      await login(username, password);
      window.location.href = "/";
    } catch (err) {
      alert("Invalid username or password");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black/40 text-white">
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-xl w-80 shadow-xl space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          className="w-full p-2 bg-gray-600 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 bg-gray-600 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded transition">
          Login
        </button>

        <p className="text-center text-sm">
          No account?{" "}
          <Link href="/register" className="text-blue-400 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
