import { useState } from "react";

export default function NewTask() {
  const [enteredTask, setEnteredTask] = useState();

  function handleChange(event) {
    setEnterTask(event, EventTarget.value);
  }

  function handleClick() {
    /*
    기능1. 입력된 값을 App 컴포넌트로 전달
    기능2. 입력란을 빈 칸으로 리셋
    */

    setEnteredTask("");
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-700 mb-4"
      />
      <button
        className="text-stone-70 hover:text-stone-950"
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
  );
}
