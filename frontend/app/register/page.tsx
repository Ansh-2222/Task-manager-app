"use client";
import { useState } from "react";
import Link from "next/link";
import { register } from "@/services/authService";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  async function handleRegister(e: any) {
  e.preventDefault();

  if (password !== confirm) {
    toast.error("Passwords do not match");
    return;
  }

  await register(username, password);

  setTimeout(() => {
    window.location.href = "/";
  }, 800); // small delay for animation
}

  return (
    <div className="flex justify-center items-center min-h-screen bg-black/40 text-white">
      <form onSubmit={handleRegister} className="bg-gray-800 p-6 rounded-xl w-80 shadow-xl space-y-4">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

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

        <input
          type="password"
          className="w-full p-2 bg-gray-600 rounded"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded transition"
        >
          Register
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
