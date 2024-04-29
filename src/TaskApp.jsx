import { useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

let nextId = null;
export default function TaskApp() {
  const [tasks, setTasks] = useState([]);

  function handleAddTask(text) {
    setTasks([...tasks, { id: nextId++, text: text, done: false }]);
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  function handleChangeTask(task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }
  return (
    <div className="flex justify-center mt-5">
      <div className="w-3/12">
        <AddTask onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onChangeTask={handleChangeTask}
        />
      </div>
    </div>
  );
}
