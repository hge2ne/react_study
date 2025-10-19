// 할 일 목록 기능
import NewTask from "./NewTask"; // 파일명이 NewTask.jsx가 아니라면 여기만 맞춰 바꿔주세요.

export default function Tasks({ tasks = [], onAdd, onDelete }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>

      {/* 새 태스크 입력 컴포넌트 */}
      <NewTask onAdd={onAdd} />

      {tasks.length === 0 ? (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      ) : (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between my-4">
              <span>{task.text}</span>
              <button
                onClick={() => onDelete?.(task.id)}
                className="text-stone-700 hover:text-red-500"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
