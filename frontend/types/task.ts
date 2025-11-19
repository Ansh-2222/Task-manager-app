export type Task = {
  id: number;
  title: string;
  description?: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
  userId: number;
};
