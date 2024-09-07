import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TaskType } from "./Task";

interface TaskRowProps {
  task: TaskType;
  index: number;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
  onChangeTask: (id: number, field: keyof TaskType, value: string) => void;
  addTaskBelow: (parentId: number | null) => void;
  addSubtask: (parentId: number) => void;
}

const TaskRow: React.FC<TaskRowProps> = ({
  task,
  index,
  moveTask,
  onChangeTask,
  addTaskBelow,
  addSubtask,
}) => {
  const ref = useRef<HTMLTableRowElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "TASK",
    hover: (item: { index: number }) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveTask(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  // Handle key navigation, making sure to use correct event type
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,  // Use generic HTMLElement to accommodate input, textarea, button
    field: keyof TaskType,
    direction: "next" | "prev"
  ) => {
    const formElements = Array.from(
      document.querySelectorAll("input, textarea, button")
    ) as HTMLElement[];
    const index = formElements.indexOf(e.currentTarget as HTMLElement);

    if (e.key === "ArrowRight" || (e.key === "Tab" && direction === "next")) {
      formElements[index + 1]?.focus();
      e.preventDefault();
    } else if (e.key === "ArrowLeft" || (e.key === "Tab" && direction === "prev")) {
      formElements[index - 1]?.focus();
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      formElements[index + 7]?.focus(); // Move to the same column in the next row
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      formElements[index - 7]?.focus(); // Move to the same column in the previous row
      e.preventDefault();
    }
  };

  return (
    <tr ref={ref} style={{ opacity: isDragging ? 0.5 : 1, marginLeft: task.level * 20 }}>
      <td>
        <input
          type="text"
          value={task.name}
          onChange={(e) => onChangeTask(task.id, "name", e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, "name", "next")}  // No more type conflict
          tabIndex={0}
        />
      </td>
      <td>
        <textarea
          value={task.description}
          onChange={(e) => onChangeTask(task.id, "description", e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, "description", "next")}  // Adjusted event type
          tabIndex={0}
        />
      </td>
      <td>
        <textarea
          value={task.plotNotes}
          onChange={(e) => onChangeTask(task.id, "plotNotes", e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, "plotNotes", "next")}  // Adjusted event type
          tabIndex={0}
        />
      </td>
      <td>
        <textarea
          value={task.characterNotes}
          onChange={(e) => onChangeTask(task.id, "characterNotes", e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, "characterNotes", "next")}  // Adjusted event type
          tabIndex={0}
        />
      </td>
      <td>
        <textarea
          value={task.themeNotes}
          onChange={(e) => onChangeTask(task.id, "themeNotes", e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, "themeNotes", "next")}  // Adjusted event type
          tabIndex={0}
        />
      </td>
      <td>
        <button onClick={() => addTaskBelow(task.id)} tabIndex={0}>
          Add Task Below
        </button>
        <button onClick={() => addSubtask(task.id)} tabIndex={0}>
          Add Subtask
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;
