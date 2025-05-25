import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "./button";
import Input from "./Input";
import SelectInput from "./selectInput";
import { getUsers } from "@/services/UserService";
import { createTask, updateTask } from "@/services/taskService";
import { useAuth } from "@/context/AuthContext";

type Task = {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
};

type UserOption = {
  id: string;
  label: string;
};

type TaskCardProps = {
  editingTask?: Task;
  handleCancel: () => void;
  refreshTasks: () => void;
  isOpen: boolean;
};

export const TaskCard = ({
  editingTask,
  handleCancel,
  refreshTasks,
  isOpen,
}: TaskCardProps) => {
  const { isAdmin } = useAuth();

  const [task, setTask] = useState<Task>({
    id: 0,
    title: "",
    description: "",
    assignedTo: "",
  });

  const [users, setUsers] = useState<UserOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const usersFetched = useRef(false);

  // Update task when editingTask changes
  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    } else {
      setTask({
        id: 0,
        title: "",
        description: "",
        assignedTo: "",
      });
    }
  }, [editingTask]);

  // Fetch users once if admin
  useEffect(() => {
    if (!isAdmin || usersFetched.current) return;

    (async () => {
      try {
        const response = await getUsers();
        if (response?.success) {
          setUsers(
            response.data
              .filter((u: { role: string }) => u.role === "user")
              .map((u: { username: string }) => ({
                id: u.username,
                label: u.username,
              }))
          );
          usersFetched.current = true;
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    })();
  }, [isAdmin]);

  const handleChange =
    (key: keyof Task) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTask((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleAssignedToChange = (value: string | number) => {
    setTask((prev) => ({ ...prev, assignedTo: String(value) }));
  };

  const handleSaveTask = useCallback(async () => {
    setError(null);
    try {
      const response = editingTask
        ? await updateTask(editingTask.id, task)
        : await createTask(task);

      if (response?.success) {
        handleCancel();
        refreshTasks();
      }
    } catch (err: any) {
      setError(err.message || "Failed to save task.");
    }
  }, [task, editingTask, handleCancel, refreshTasks]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60" />

      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] rounded-2xl border bg-white p-6 shadow-lg">
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                id="title"
                label="Task Title"
                placeholder="Enter task title"
                value={task.title}
                onChange={handleChange("title")}
              />
            </div>
            {isAdmin && (
              <div className="w-2/5">
                <SelectInput
                  id="assignedTo"
                  label="Assigned To"
                  items={users}
                  value={task.assignedTo}
                  onChange={handleAssignedToChange}
                  placeholder="Select a user"
                />
              </div>
            )}
          </div>

          <Input
            id="description"
            label="Description"
            placeholder="Task description"
            type="textarea"
            value={task.description}
            onChange={handleChange("description")}
          />

          {error && (
            <div className="text-sm font-medium text-red-500">{error}</div>
          )}

          <div className="mt-4 flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="text-red-500"
            >
              Cancel
            </Button>
            <Button onClick={handleSaveTask}>Save</Button>
          </div>
        </div>
      </div>
    </>
  );
};
