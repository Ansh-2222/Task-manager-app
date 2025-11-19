"use client";

import { useEffect, useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import EditModal from "@/components/EditModal";
import { Task } from "@/types/task";
import { logout } from "@/services/authService";

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    setIsClient(true);

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  // Prevent hydration mismatch
  if (!isClient) return null;

  // Prevent UI flash before redirect
  if (!isAuthenticated) return null;

  return (
    <main className="p-10 min-h-screen text-white bg-cover" style={{ backgroundImage: "url('/bg.jpg')" }}>
      <div className="max-w-3xl mx-auto space-y-6 bg-black/30 p-8 rounded-2xl border border-white/10">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl text-center font-bold mb-2">Task Manager</h1>

          <button
            onClick={() => {
              logout();
              window.location.href = "/login";
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
          >
            Logout
          </button>
        </div>

        <TaskForm onCreate={(data) => addTask(data)} />

        <TaskList
          tasks={tasks}
          onToggle={(id, status) => updateTask(id, { status })}
          onEdit={setEditingTask}
          onDelete={deleteTask}
        />

      </div>

      <EditModal
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={(data) => {
          if (editingTask)
            updateTask(editingTask.id, {
              ...data,
              priority: data.priority as "low" | "medium" | "high"
            });

          setEditingTask(null);
        }}
      />
    </main>
  );
}
