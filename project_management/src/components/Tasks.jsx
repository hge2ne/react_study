// 할 일 목록 기능
import NewTasks from "./NewTasks";

export default function Tasks() {
  return (
    <section>
      <h2
        className="text-2xl font-bold text-stone-700 mb-4
        "
      >
        <NewTasks></NewTasks>
      </h2>
      <p className="text-stone-800 my-4">
        This project does not have any tasks yet.
      </p>
      <ul></ul>
    </section>
  );
}
