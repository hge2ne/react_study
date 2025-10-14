
# 프로젝트 상태 관리 기능 추가

이번 업데이트에서는 프로젝트를 추가하고 선택하는 기능의 기반을 마련했습니다. 주요 변경 사항은 `useState`를 사용하여 애플리케이션의 상태를 관리하고, 상태에 따라 다른 컴포넌트를 동적으로 렌더링하는 것입니다.

## 목차

1.  [**`App.jsx`**: 중앙 상태 관리 및 조건부 렌더링](#1-appjsx--중앙-상태-관리-및-조건부-렌더링)
2.  [**`ProjectsSidebar.jsx`**: 프로젝트 추가 기능 연결](#2-projectssidebarjsx--프로젝트-추가-기능-연결)
3.  [**`NoProjectSelected.jsx`**: 프로젝트 생성 시작 기능 연결](#3-noprojectselectedjsx--프로젝트-생성-시작-기능-연결)

---

### 1. `App.jsx` : 중앙 상태 관리 및 조건부 렌더링

`App.jsx`는 이제 애플리케이션의 최상위 컴포넌트로서, 전체 프로젝트 상태를 관리하고 사용자의 행동에 따라 적절한 화면을 보여주는 역할을 합니다.

#### **1-1. `useState` import**

상태 관리를 위해 React의 `useState` 훅(Hook)을 가져옵니다.

```javascript
// src/App.jsx

import { useState } from "react";
```

-   **주요 개념**: `useState`는 함수형 컴포넌트에서 상태(state)를 관리할 수 있게 해주는 React Hook입니다. 이를 통해 컴포넌트는 동적인 데이터를 기억하고, 데이터가 변경될 때 UI를 다시 렌더링할 수 있습니다.

#### **1-2. 중앙 상태 `projectsState` 정의**

`useState`를 사용하여 `projectsState`라는 이름의 상태 변수를 생성합니다. 이 상태는 두 가지 중요한 정보를 객체 형태로 관리합니다.

```javascript
// src/App.jsx

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });
```

-   `selectedProjectId`: 현재 선택된 프로젝트의 ID를 저장합니다.
    -   `undefined`: 아무 프로젝트도 선택되지 않은 초기 상태 (앱이 처음 로드될 때).
    -   `null`: 새 프로젝트를 생성 중인 상태.
    -   `숫자 ID`: 특정 프로젝트가 선택된 상태 (추후 구현).
-   `projects`: 생성된 모든 프로젝트의 목록을 배열 형태로 저장합니다.

#### **1-3. `handleStartAddProject` 함수 추가**

새 프로젝트 추가를 시작하는 `handleStartAddProject` 함수를 정의합니다. 이 함수는 "Add Project" 또는 "Create new project" 버튼을 클릭했을 때 호출됩니다.

```javascript
// src/App.jsx

function handleStartAddProject() {
  setProjectsState((prevState) => {
    return {
      ...prevState,
      selectedProjectId: null,
    };
  });
}
```

-   **주요 개념 (상태 업데이트)**: `setProjectsState` 함수에 콜백 함수를 전달하여 이전 상태(`prevState`)를 기반으로 새로운 상태를 계산합니다.
-   **불변성 유지**: `...prevState` 구문을 사용하여 기존 상태 객체를 얕게 복사한 후, `selectedProjectId`의 값만 `null`로 변경합니다. 이는 React에서 상태의 불변성을 유지하는 핵심 패턴으로, 예기치 않은 부작용을 방지하고 성능 최적화를 돕습니다.

#### **1-4. 조건부 렌더링 로직 구현**

`projectsState.selectedProjectId` 값에 따라 `content` 변수에 각기 다른 컴포넌트를 할당합니다.

```javascript
// src/App.jsx

let content;

if (projectsState.selectedProjectId === null) {
  content = <NewProject />;
} else if (projectsState.selectedProjectId === undefined) {
  content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
}
```

-   `selectedProjectId`가 `null`이면 `NewProject` 컴포넌트를 보여줘 새 프로젝트를 생성하는 UI를 렌더링합니다.
-   `selectedProjectId`가 `undefined`이면 `NoProjectSelected` 컴포넌트를 보여줘 프로젝트를 선택하거나 새로 만들도록 안내합니다.

#### **1-5. 자식 컴포넌트에 함수 전달 (Props Drilling)**

`ProjectsSidebar`와 `content`로 렌더링될 `NoProjectSelected` 컴포넌트에 `handleStartAddProject` 함수를 `onStartAddProject`라는 prop으로 전달합니다.

```javascript
// src/App.jsx

return (
  <main className="h-screen my-8 flex gap-8">
    <ProjectsSidebar onStartAddProject={handleStartAddProject} />
    {content}
  </main>
);
```

-   **주요 개념 (Props)**: 부모 컴포넌트(`App`)가 자식 컴포넌트(`ProjectsSidebar`, `NoProjectSelected`)에게 데이터나 함수를 전달하는 방법입니다. 이를 통해 자식 컴포넌트에서 발생한 이벤트를 부모 컴포넌트가 처리할 수 있습니다.

---

### 2. `ProjectsSidebar.jsx` : 프로젝트 추가 기능 연결

사이드바의 "+ Add Project" 버튼을 클릭했을 때, `App` 컴포넌트의 상태를 변경할 수 있도록 기능을 연결합니다.

#### **2-1. `onStartAddProject` Prop 받기**

`App` 컴포넌트로부터 `onStartAddProject` 함수를 prop으로 받습니다.

```javascript
// src/components/ProjectsSidebar.jsx

export default function ProjectsSidebar({ onStartAddProject }) {
  // ...
}
```

#### **2-2. `onClick` 이벤트 핸들러 추가**

`Button` 컴포넌트에 `onClick` 이벤트를 추가하고, `onStartAddProject` 함수를 연결합니다.

```javascript
// src/components/ProjectsSidebar.jsx

<Button onClick={onStartAddProject}>+ Add Project</Button>
```

-   이제 사용자가 "+ Add Project" 버튼을 클릭하면 `App` 컴포넌트의 `handleStartAddProject` 함수가 실행되어 `selectedProjectId`가 `null`로 변경되고, 결과적으로 `NewProject` 컴포넌트가 화면에 나타납니다.

---

### 3. `NoProjectSelected.jsx` : 프로젝트 생성 시작 기능 연결

초기 화면에서 "Create new project" 버튼을 눌렀을 때도 새 프로젝트 생성 프로세스를 시작할 수 있도록 기능을 연결합니다.

#### **3-1. `onStartAddProject` Prop 받기**

`App` 컴포넌트로부터 `onStartAddProject` 함수를 prop으로 받습니다.

```javascript
// src/components/NoProjectSelected.jsx

export default function NoProjectSelected({ onStartAddProject }) {
  // ...
}
```

#### **3-2. `Button` 컴포넌트 import**

`Button` 컴포넌트를 사용하기 위해 파일을 import 합니다.

```javascript
// src/components/NoProjectSelected.jsx

import Button from "./Button";
```

#### **3-3. `onClick` 이벤트 핸들러 추가**

"Create new project" 버튼에 `onClick` 이벤트를 추가하고, `onStartAddProject` 함수를 연결합니다.

```javascript
// src/components/NoProjectSelected.jsx

<Button onClick={onStartAddProject}>Create new project</Button>
```

-   이제 사용자가 초기 화면의 "Create new project" 버튼을 클릭해도 `App` 컴포넌트의 `handleStartAddProject` 함수가 실행되어 동일하게 새 프로젝트 생성 화면으로 전환됩니다.

이러한 변경을 통해 애플리케이션은 중앙에서 상태를 관리하고, 사용자의 상호작용에 따라 동적으로 UI를 업데이트하는 기본적인 구조를 갖추게 되었습니다.
