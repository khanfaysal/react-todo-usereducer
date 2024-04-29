/* eslint-disable react/prop-types */
import { useState } from "react";
export default function TaskList({ tasks, onDeleteTask, onChangeTask }) {
  if (tasks.length === 0) {
    return <p className="mt-1">There is no exists task right now!</p>;
  }
  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li className="flex gap-x-2 mt-2" key={task.id}>
            <Task task={task} onDelete={onDeleteTask} onChange={onChangeTask} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Task({ task, onDelete, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            onChange({ ...task, text: e.target.value });
          }}
          className="bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 transition-colors duration-200 ease-in-out px-3"
        />
        <button
          className="mx-1 rounded bg-indigo-500 text-white text-sm py-[3px] px-2"
          onClick={() => setIsEditing(false)}
        >
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        <p>{task.text}</p>
        <button
          className="mx-1 rounded bg-indigo-500 text-white text-sm py-[3px] px-2"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      </>
    );
  }
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        onChange={(e) => {
          onChange({ ...task, done: e.target.checked });
        }}
        checked={task.done}
        className="mr-2"
      />
      {taskContent}
      <button
        className="rounded bg-red-500 text-black text-sm py-[3px] px-2"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </div>
  );
}
