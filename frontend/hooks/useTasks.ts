"use client";
import { useState, useEffect } from "react";
import type { Task } from "@/types/task";
import toast from "react-hot-toast";


const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  const sortTasks = (list: Task[]) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };

    return list.sort((a, b) => {
      if (a.status === "completed" && b.status !== "completed") return 1;
      if (b.status === "completed" && a.status !== "completed") return -1;

      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  const fetchTasks = async () => {
    const token = getToken();
    if (!token) return;

    const res = await fetch(`${API_URL}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return console.error("❌ Failed to fetch tasks");

    const data = await res.json();
    setTasks(sortTasks(data));
  };

  const addTask = async (data: any ) => {
    const token = getToken();
    if (!token) return;

    await fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    fetchTasks();
  };

  const updateTask = async (id: number, data: Partial<Task>) => {
  const token = getToken();

  await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  toast.success(
    data.status === "completed"
      ? "Task marked as completed 🎉"
      : "Task moved back to pending ⏪"
  );

  fetchTasks();
};

  const deleteTask = async (id: number) => {
    const token = getToken();

    await fetch(`${API_URL}/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchTasks();
  };

  

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, addTask, updateTask, deleteTask };
}
