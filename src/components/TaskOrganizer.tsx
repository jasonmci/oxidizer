import React, { useState } from "react";
import { TaskType } from "./Task";
import TaskRow from "./TaskRow";

const TaskOrganizer: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([
    {
      id: 1,
      name: "Main Task",
      description: "",
      plotNotes: "",
      characterNotes: "",
      themeNotes: "",
      level: 0,
      subtasks: [],
    },
  ]);

  // Add a new task below the specified task ID or at the end if null
  const addTaskBelow = (parentId: number | null = null) => {
    const newTask: TaskType = {
      id: Math.floor(Math.random() * 1000),
      name: "New Task",
      description: "",
      plotNotes: "",
      characterNotes: "",
      themeNotes: "",
      level: parentId ? 1 : 0, // Subtask if there's a parentId
      subtasks: [],
    };

    const insertTask = (tasksToUpdate: TaskType[]): TaskType[] => {
      if (parentId === null) {
        return [...tasksToUpdate, newTask];
      }

      return tasksToUpdate.flatMap((task) =>
        task.id === parentId
          ? [task, newTask, ...task.subtasks] // Insert the new task below the parent
          : [task, ...insertTask(task.subtasks)]
      );
    };

    setTasks(insertTask(tasks));
  };

  // Add a subtask below the specified task
  const addSubtask = (parentId: number) => {
    const newSubtask: TaskType = {
      id: Math.floor(Math.random() * 1000),
      name: "New Subtask",
      description: "",
      plotNotes: "",
      characterNotes: "",
      themeNotes: "",
      level: 1,
      subtasks: [],
    };

    const insertSubtask = (tasksToUpdate: TaskType[]): TaskType[] => {
      return tasksToUpdate.flatMap((task) =>
        task.id === parentId
          ? [task, { ...newSubtask, level: task.level + 1 }, ...task.subtasks]
          : [task, ...insertSubtask(task.subtasks)]
      );
    };

    setTasks(insertSubtask(tasks));
  };

  const moveTask = (dragIndex: number, hoverIndex: number) => {
    const draggedTask = tasks[dragIndex];
    const updatedTasks = [...tasks];
    updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTask);
    setTasks(updatedTasks);
  };

  const onChangeTask = (id: number, field: keyof TaskType, value: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, [field]: value } : task
      )
    );
  };

  return (
    <div>
      <h1>Task Organizer</h1>
      <table border={1} width="100%">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Plot Notes</th>
            <th>Character Notes</th>
            <th>Theme Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <TaskRow
              key={task.id}
              index={index}
              task={task}
              moveTask={moveTask}
              onChangeTask={onChangeTask}
              addTaskBelow={addTaskBelow}  // Passing addTaskBelow function to TaskRow
              addSubtask={addSubtask}      // Passing addSubtask function to TaskRow
            />
          ))}
          {/* Add task at the end of the list */}
          <tr>
            <td colSpan={6}>
              <button onClick={() => addTaskBelow(null)}>Add Task</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TaskOrganizer;
