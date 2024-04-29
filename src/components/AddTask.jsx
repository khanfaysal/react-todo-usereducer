import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function AddTask({ onAddTask }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const addTask = () => {
    // check if  the task is not empty
    if (text.trim() !== "") {
      onAddTask(text);
      setText("");
      setError("");
    } else {
      setError("please enter a task name");
    }
  };

  const handleKeyPress = (e) => {
    e.key === "Enter" && addTask();
  };

  return (
    <>
      <div className="flex gap-x-4">
        <input
          type="text"
          name=""
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 transition-colors duration-200 ease-in-out px-3"
        />
        <button
          className="text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      {error && <p className="text-red-400">{error}</p>}
    </>
  );
}
