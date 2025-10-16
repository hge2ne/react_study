import Button from "./Button.jsx";
import SelectedProject from "./SelectedProject.jsx";

export default function ProjectsSidebar({
  onStartAddProject,
  projects,
  onSelectProject,
  SelectedProjectId,
}) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <Button onClick={onStartAddProject}>+ Add Project</Button>
      <ul className="mt-8">
        {projects.map((project) => {
          //여기에 코드 추가
          let cssClasses =
            "w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800";

          if (project.id === SelectedProjectId) {
            cssClasses += "bg-stone-800 text-stone-200";
          } else {
            cssClasses += "text-stone-400";
          }
          return (
            <li key={project.id}>
              <button
                onClick={() => onSelectProject(project.id)}
                className={cssClasses}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
      {/* 
      배열에 있는 모든 아이템을 매핑하여 모든 아이템을 jsx 요소로 내보내기 가능
      (주의) map() 사용할때 사용하는 root 항목(li 는 key 속성을 받아야함) 
      */}
    </aside>
  );
}
