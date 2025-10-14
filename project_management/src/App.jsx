import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from "react";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined, //(주의) null 아님. 나중에 프로젝트가 여러개 있을 때 그중 선택된 프로젝트의 ID 저장
    projects: [],
  });
  //handleStartAddProject : 버튼 중 하나를 클릭해 새로운 프로젝트를 만들때 실행됨

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      //setState : 상태 업데이트 함수. 파라미터로 값, 콜백함수 모두 받기 가능
      //()=> 콜백함수 의미: 이전상태(prevState)를 주면, 그걸 기반으로 new 상태객체를 계산해서 return 해줌

      return {
        ...prevState /* 이전 상태를 얕게 복사 */,
        selectedProjectId: null, // 리액트에서 상태는 불변으로 다루는게 원칙이므로, 바꾸고싶은 필드만 setState 사용해서 값 바꿔치기
      };
    });
  }

  let content;

  if (projectsState.selectedProjectId === null) {
    //projectsState.selectedProjectedId 가 null 상태 : 사용자가 버튼을 눌러서 초기값이 null 로 변경된 상태

    content = <NewProject />; // content 상태를 컴포넌트로 가정
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
    {
      /* 
      위 함수를 NoProjectSelected 버튼과 연결
      */
    }
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} />
      {content}
    </main>
  );
}

export default App;
