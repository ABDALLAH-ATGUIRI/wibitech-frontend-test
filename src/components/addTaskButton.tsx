import { PlusSquareIcon } from "lucide-react";
import { Button } from "./button";

const AddTaskButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    variant="ghost"
    className="py-4 text-gray-400 hover:bg-gray-50 text-xl font-medium mt-4"
    onClick={onClick}
  >
    <PlusSquareIcon size={24} className="mr-2" />
    Add a new task...
  </Button>
);

export default AddTaskButton;
