"use client";
import { useState, FormEvent } from "react";
import { Plus } from "phosphor-react";

interface Props {
  onCreate: (data: { title: string; description: string; priority: string }) => void;
}

export default function TaskForm({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({ title, description, priority });

    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white/10 p-5 rounded-xl border border-white/20">
      <div className="flex gap-3">
        <input
          className="flex-1 px-4 py-2 bg-white/10 border border-gray-500 rounded-lg outline-none"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="bg-blue-600 hover:bg-blue-700 transition p-2 rounded-lg">
          <Plus size={24} />
        </button>
      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Notes..."
        rows={2}
        className="w-full px-4 py-2 bg-white/10 border border-gray-500 rounded-lg outline-none"
      />

      <select
        className="px-4 py-2 bg-gray-800 text-white border border-gray-500 rounded-lg focus:border-blue-500 focus:outline-none"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
    </form>
  );
}
