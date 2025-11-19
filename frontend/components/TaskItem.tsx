import { Task } from "@/types/task";
import { Check, PencilSimple, TrashSimple } from "phosphor-react";

interface Props {
  task: Task;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  return (
    <li className="flex justify-between items-center p-5 bg-white/10 border border-white/20 rounded-lg">
      <div>
        <p className={`text-lg font-medium ${task.status === "completed" ? "line-through text-gray-400" : ""}`}>
          {task.title}
        </p>

        {task.description && (
          <p className="text-sm text-gray-300 mt-1">{task.description}</p>
        )}

        <span
          className={`mt-2 inline-block px-3 py-1 text-xs rounded-lg ${
            task.priority === "high"
              ? "bg-red-600/50 text-red-300"
              : task.priority === "medium"
              ? "bg-yellow-600/50 text-yellow-300"
              : "bg-green-600/50 text-green-300"
          }`}
        >
          {task.priority.toUpperCase()}
        </span>
      </div>

      <div className="flex gap-3">
        <button onClick={() => onToggle()} className="hover:bg-green-600/70 p-2 rounded-lg">
          <Check size={20} />
        </button>

        <button onClick={onEdit} className="hover:bg-yellow-600/40 p-2 rounded-lg">
          <PencilSimple size={20} />
        </button>

        <button onClick={onDelete} className="hover:bg-red-600/40 p-2 rounded-lg">
          <TrashSimple size={20} />
        </button>
      </div>
    </li>
  );
}
