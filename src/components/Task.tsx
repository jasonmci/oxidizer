import React, { useState } from "react";

export interface TaskType {
  id: number;
  name: string;
  description: string;
  plotNotes: string;
  characterNotes: string;
  themeNotes: string;
  level: number;
  subtasks: TaskType[];
}

interface TaskProps {
  task: TaskType;
  onUpdateTask: (id: number, updatedTask: TaskType) => void;
}

const Task: React.FC<TaskProps> = ({ task, onUpdateTask }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (field: keyof TaskType, value: string) => {
    onUpdateTask(task.id, { ...task, [field]: value });
  };

  return (
    <div style={{ marginLeft: task.level * 20 }}>
      <div>
        <strong>Task Name:</strong>
        <input
          type="text"
          value={task.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? "Collapse" : "Expand"}
        </button>
      </div>
      {expanded && (
        <div style={{ marginLeft: 20 }}>
          <div>
            <strong>Description:</strong>
            <textarea
              value={task.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <div>
            <strong>Plot Notes:</strong>
            <textarea
              value={task.plotNotes}
              onChange={(e) => handleChange("plotNotes", e.target.value)}
            />
          </div>
          <div>
            <strong>Character Notes:</strong>
            <textarea
              value={task.characterNotes}
              onChange={(e) => handleChange("characterNotes", e.target.value)}
            />
          </div>
          <div>
            <strong>Theme Notes:</strong>
            <textarea
              value={task.themeNotes}
              onChange={(e) => handleChange("themeNotes", e.target.value)}
            />
          </div>
          {/* Render Subtasks */}
          {task.subtasks.length > 0 && (
            <div>
              <h4>Subtasks:</h4>
              {task.subtasks.map((subtask) => (
                <Task key={subtask.id} task={subtask} onUpdateTask={onUpdateTask} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Task;
