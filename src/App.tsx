import React from "react";
import TaskOrganizer from "./components/TaskOrganizer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <TaskOrganizer />
      </div>
    </DndProvider>
  );
};

export default App;
