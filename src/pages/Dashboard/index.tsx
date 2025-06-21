import { useEffect, useState, useCallback } from "react";
import { Header } from "@/components/header";
import { useAuth } from "@/context/AuthContext";
import { TaskCard } from "@/components/taskCard";
import { deleteTask, getTasks, updateTask } from "@/services/taskService";
import AddTaskButton from "@/components/addTaskButton";
import TaskItem from "@/components/taskItem";

interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  status: string;
}

interface DialogState {
  open: boolean;
  task: Task | null;
}

export const Dashboard = (): JSX.Element => {
  const { user, isAdmin } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState<DialogState>({
    open: false,
    task: null,
  });
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await getTasks();
      setTasks(data.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }, []);

  const handleOpenDialog = (task?: Task) => {
    setIsDialogOpen({ open: true, task: task ?? null });
  };

  const handleDeleteTask = useCallback(
    async (id: number) => {
      try {
        const res = await deleteTask(id);
        if (res?.success) fetchTasks();
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    },
    [fetchTasks]
  );

  const handleCompleteTask = async (id: number) => {
    try {
      const res = await updateTask(id, { status: "done" });
      if (res?.success) fetchTasks();
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="min-h-screen bg-[#f5f7f9] p-6">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="my-14">
          <h1 className="text-3xl font-extrabold mb-2">
            Welcome, <span className="text-[#007fff]">{user?.username}</span>.
          </h1>
          <p className="text-gray-500">
            Your team has {tasks.length} task{tasks.length !== 1 && "s"}.
          </p>
        </div>

        <TaskList
          tasks={tasks}
          onEdit={handleOpenDialog}
          onDelete={handleDeleteTask}
          onComplete={handleCompleteTask}
        />

        {isAdmin && <AddTaskButton onClick={() => handleOpenDialog()} />}
      </div>

      <TaskCard
        isOpen={isDialogOpen.open}
        editingTask={isDialogOpen.task ?? undefined}
        handleCancel={() => setIsDialogOpen({ open: false, task: null })}
        refreshTasks={fetchTasks}
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// TaskList Component
const TaskList = ({
  tasks,
  onEdit,
  onDelete,
  onComplete,
}: {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
}) => {
  if (!tasks.length) return <EmptyState />;
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// EmptyState Component
const EmptyState = () => (
  <p className="text-center text-gray-400 italic mb-6">
    No tasks available. Add one below.
  </p>
);
