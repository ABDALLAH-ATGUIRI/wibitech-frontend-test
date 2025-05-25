import {
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  CheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useAuth } from "@/context/AuthContext";

interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  status: string;
}

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
}

const TaskItem = ({ task, onEdit, onDelete, onComplete }: TaskItemProps) => {
  const { isAdmin } = useAuth();
  const isCompleted = task.status === "done";

  return (
    <div className="p-4 bg-gray-200/70 px-6 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between gap-4">
        {isCompleted && <CheckIcon size={28} className="text-blue-400 mt-1" />}

        <div className="flex-1">
          <div className="mb-2">
            <span className="text-sm text-[#007fff]">@{task.assignedTo}</span>
            <h3
              className={clsx(
                "text-lg font-semibold",
                isCompleted && "line-through text-gray-500"
              )}
            >
              {task.title}
            </h3>
          </div>
          <p
            className={clsx(
              "text-sm text-gray-500",
              isCompleted && "line-through"
            )}
          >
            Note: {task.description}
          </p>
        </div>

        {!isCompleted && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(task)}
            >
              <PencilIcon className="h-4 w-4" />
            </Button>

            {isAdmin && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500"
                onClick={() => onDelete(task.id)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            )}

            <Button onClick={() => onComplete(task.id)} size="sm">
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
