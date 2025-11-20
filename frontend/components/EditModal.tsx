import { Task } from "@/types/task";
import { XCircle } from "phosphor-react";
import { useState } from "react";

interface Props {
  task: Task | null;
  onClose: () => void;
  onSave: (data: { title: string; description: string; priority: "low" | "medium" | "high" }) => void;
}

export default function EditModal({ task, onClose, onSave }: Props) {
  if (!task) return null;

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState<"low" | "medium" | "high">(task.priority);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="bg-black/40 p-6 rounded-xl border border-gray-600 w-80 space-y-4">
        <h2 className="text-xl font-semibold">Edit Task</h2>

        <input
          className="w-full px-3 py-2 bg-white/10 border border-gray-500 rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full px-3 py-2 bg-white/10 border border-gray-500 rounded-lg"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="px-4 py-2 bg-gray-800 text-white border border-gray-500 rounded-lg focus:border-blue-500 focus:outline-none"
          value={priority}
          onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600/40 rounded-lg hover:bg-gray-700">
            <XCircle size={22} />
          </button>

          <button
            onClick={() => onSave({ title, description, priority })}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
