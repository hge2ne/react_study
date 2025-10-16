// 할 일 목록 기능
<<<<<<< HEAD
import NewTasks from "./NewTasks";

export default function Tasks() {
=======
import NewTask from "./NewTask";
import { useLayoutEffect, useState } from "react";

export default function Tasks({ tasks, onAdd, onDlete }) {
  const [enteredTask, setEnteredTask] = useState();

  function handleChange(event) {
    onAdd(enteredTask);
    setEnteredTask(event.target.value);
  }
>>>>>>> 24d2603 (태스크 관리 & Prop Drilling 이해하기)
  return (
    <section>
      <h2
        className="text-2xl font-bold text-stone-700 mb-4
        "
      >
<<<<<<< HEAD
        <NewTasks></NewTasks>
      </h2>
      <p className="text-stone-800 my-4">
        This project does not have any tasks yet.
      </p>
      <ul></ul>
=======
        <NewTask onAdd={onAdd}></NewTask>
      </h2>
      {tasks.lengh === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      )}
      {tasks.lengh > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-beetween my-4">
              <span>{task.text}</span>
              <button className="text-stone-700 hover:text-red-500">
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
>>>>>>> 24d2603 (태스크 관리 & Prop Drilling 이해하기)
    </section>
  );
}
