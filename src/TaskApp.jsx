import { useReducer } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

let nextId = null;

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  function handleAddTask(text) {
    dispatch({
      type: "addTask",
      id: nextId,
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

function taskReducer(tasks, action) {
  // if (action.type === "addTask") {
  //   return [...tasks, { id: nextId++, text: action.text, done: false }];
  // } else if (action.type === "deleteTask") {
  //   return tasks.filter((t) => t.id !== action.id);
  // } else if (action.type === "changeTask") {
  //   return tasks.map((t) => {
  //     if (t.id === action.task.id) {
  //       return action.task;
  //     } else {
  //       return t;
  //     }
  //   });
  // } else {
  //   throw Error("Unknown action" + action.type);
  // }

  // switch (action.type) {
  //   case "addTask": {
  //     return [...tasks, { id: nextId++, text: action.text, done: false }];
  //   }
  //   case "deleteTask": {
  //     return tasks.filter((t) => t.id !== action.id);
  //   }
  //   case "changeTask": {
  //     return tasks.map((t) => {
  //       if (t.id === action.task.id) {
  //         return action.task;
  //       } else {
  //         return t;
  //       }
  //     });
  //   }
  //   default: {
  //     throw Error("Unknown action" + action.type);
  //   }
  // }

  // shortcut of switch case
  const handlers = {
    addTask: () => [...tasks, { id: nextId++, text: action.text, done: false }],
    deleteTask: () => tasks.filter((t) => t.id !== action.id),
    changeTask: () =>
      tasks.map((t) => (t.id === action.task.id ? action.task : t)),
  };

  const handler = handlers[action.type];
  if (handler) {
    return handler();
  } else {
    throw new Error("Unknown action" + action.type);
  }
}
