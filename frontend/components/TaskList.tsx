import { Task } from "@/types/task";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  onToggle: (id: number, status: "pending" | "completed") => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onToggle, onEdit, onDelete }: Props) {
  return (
    <ul className="space-y-4 max-h-[400px] overflow-auto pr-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() =>
            onToggle(
              task.id,
              task.status === "pending" ? "completed" : "pending"
            )
          }
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </ul>
  );
}
