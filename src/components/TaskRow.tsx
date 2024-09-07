import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TaskType } from "./Task";

interface TaskRowProps {
  task: TaskType;
  index: number;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
  onChangeTask: (id: number, field: keyof TaskType, value: string) => void;
  addTaskBelow: (parentId: number | null) => void;  // Add Task Below prop
  addSubtask: (parentId: number) => void;           // Add Subtask prop
}

const TaskRow: React.FC<TaskRowProps> = ({ task, index, moveTask, onChangeTask, addTaskBelow, addSubtask }) => {
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

  return (
    <tr ref={ref} style={{ opacity: isDragging ? 0.5 : 1, marginLeft: task.level * 20 }}>
      <td>
        <input
          type="text"
          value={task.name}
          onChange={(e) => onChangeTask(task.id, "name", e.target.value)}
        />
      </td>
      <td>
        <textarea
          value={task.description}
          onChange={(e) => onChangeTask(task.id, "description", e.target.value)}
        />
      </td>
      <td>
        <textarea
          value={task.plotNotes}
          onChange={(e) => onChangeTask(task.id, "plotNotes", e.target.value)}
        />
      </td>
      <td>
        <textarea
          value={task.characterNotes}
          onChange={(e) => onChangeTask(task.id, "characterNotes", e.target.value)}
        />
      </td>
      <td>
        <textarea
          value={task.themeNotes}
          onChange={(e) => onChangeTask(task.id, "themeNotes", e.target.value)}
        />
      </td>
      <td>
        {/* Add Task Below and Add Subtask buttons, calling appropriate functions */}
        <button onClick={() => addTaskBelow(task.id)}>Add Task Below</button>
        <button onClick={() => addSubtask(task.id)}>Add Subtask</button>
      </td>
    </tr>
  );
};

export default TaskRow;
