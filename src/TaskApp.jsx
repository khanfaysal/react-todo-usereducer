import { useReducer } from "react";
import taskReducer from "./usereducer/taskReducer";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  const getNextId = (data) => {
    if (data.length === 0) {
      return 1;
    }
    const maxId = data.reduce((prev, current) =>
      prev && prev.id > current.id ? prev.id : current.id
    );

    return maxId + 1;
  };

  function handleAddTask(text) {
    dispatch({
      type: "addTask",
      id: getNextId(tasks),
      text: text,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "deleteTask",
      id: taskId,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: "changeTask",
      task: task,
    });
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
