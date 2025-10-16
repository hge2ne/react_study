export default function NewTasks() {
  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-700 mb-4"
      />
      <button>Add Task</button>
    </div>
  );
}
