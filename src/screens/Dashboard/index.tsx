import { useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  PlusSquareIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import clsx from "clsx";
import { Header } from "@/components/header";

interface Task {
  id: number;
  title: string;
  note: string;
  assignedTo: string;
}

export const Dashboard = (): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Task 01",
      note: "Add relevant details, blockers, or context for this task here.",
      assignedTo: "User 1",
    },
    {
      id: 2,
      title: "Task 02",
      note: "Add relevant details, blockers, or context for this task here.",
      assignedTo: "User 2",
    },
    {
      id: 3,
      title: "Task 03",
      note: "Add relevant details, blockers, or context for this task here.",
      assignedTo: "User 3",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    note: "",
    assignedTo: "",
  });

  const handleOpenDialog = (task?: Task) => {
    if (task) {
      setEditingTask(task);
      setNewTask(task);
    } else {
      setEditingTask(null);
      setNewTask({ title: "", note: "", assignedTo: "" });
    }
    setIsDialogOpen(true);
  };

  const handleSaveTask = () => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...newTask } : task
        )
      );
    } else {
      const newId = Math.max(...tasks.map((t) => t.id), 0) + 1;
      const { id, ...taskData } = newTask as Task;
      setTasks([...tasks, { id: newId, ...taskData }]);
    }
    setIsDialogOpen(false);
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-[#f5f7f9] p-6">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="my-14">
          <h1 className="text-3xl font-extrabold mb-2">
            Welcome, <span className="text-[#007fff]">Admin</span>.
          </h1>
          <p className="text-gray-500">
            Your team got {tasks.length} tasks to do.
          </p>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-gray-200/70 px-6 rounded-2xl shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex flex-col gap-1 mb-2">
                    <span className="text-sm text-[#007fff]">
                      @{task.assignedTo}
                    </span>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{task.note}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleOpenDialog(task)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                  <Button className="bg-[#007fff] text-white hover:bg-[#0066cc]">
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    Done
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <Button
            variant="ghost"
            className="py-4 text-gray-400 hover:bg-gray-50 text-xl font-medium"
            onClick={() => handleOpenDialog()}
          >
            <PlusSquareIcon size={24} />
            Add a new task...
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] p-6 gap-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {editingTask ? "Edit Task" : "Create New Task"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="text-sm font-semibold mb-2 block"
              >
                Title
              </label>
              <input
                id="title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                className={clsx(
                  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "h-12 bg-[#f5f7f9] border-0 rounded-[15px]"
                )}
                placeholder="Enter task title"
              />
            </div>
            <div>
              <label
                htmlFor="assignedTo"
                className="text-sm font-semibold mb-2 block"
              >
                Assigned To
              </label>
              <input
                id="assignedTo"
                value={newTask.assignedTo}
                onChange={(e) =>
                  setNewTask({ ...newTask, assignedTo: e.target.value })
                }
                className={clsx(
                  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "h-12 bg-[#f5f7f9] border-0 rounded-[15px]"
                )}
                placeholder="Enter username"
              />
            </div>
            <div>
              <label
                htmlFor="note"
                className="text-sm font-semibold mb-2 block"
              >
                Note
              </label>
              <input
                id="note"
                value={newTask.note}
                onChange={(e) =>
                  setNewTask({ ...newTask, note: e.target.value })
                }
                className={clsx(
                  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "h-12 bg-[#f5f7f9] border-0 rounded-[15px]"
                )}
                placeholder="Add task details"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="ghost"
              onClick={() => setIsDialogOpen(false)}
              className="h-12 px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveTask}
              className="h-12 px-6 bg-[#007fff] text-white hover:bg-[#0066cc]"
            >
              {editingTask ? "Save Changes" : "Create Task"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
