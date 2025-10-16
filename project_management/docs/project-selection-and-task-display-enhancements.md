
# 프로젝트 선택 및 태스크 표시 기능 개선

안녕하세요. 시니어 프론트엔드 개발자입니다. 이번 코드 변경 사항에 대해 상세히 설명해 드리겠습니다.

이번 작업의 핵심은 사용자가 프로젝트를 선택했을 때 해당 프로젝트의 상세 내용과 태스크를 볼 수 있도록 기능을 개선하고, 일부 컴포넌트의 상호작용을 수정한 것입니다.

각 파일별 변경 사항을 단계적으로 살펴보겠습니다.

---

## 1. `src/App.jsx`: 선택된 프로젝트 ID 설정 로직 수정

`App.jsx`는 우리 애플리케이션의 최상위 상태를 관리하는 핵심 컴포넌트입니다.

### 변경 전

```jsx
// src/App.jsx

function handleSelectProject(id) {
  setProjectsState((prevState) => {
    return {
      ...prevState,
      selectedProjectId: null, // 프로젝트 선택 시 ID를 null로 설정하고 있었음
    };
  });
}
```

### 변경 후

```jsx
// src/App.jsx

function handleSelectProject(id) {
  setProjectsState((prevState) => {
    return {
      ...prevState,
      selectedProjectId: id, // 선택된 프로젝트의 id를 상태에 저장
    };
  });
}
```

### 설명

- **`handleSelectProject` 함수:** 이 함수는 사용자가 사이드바에서 특정 프로젝트를 클릭했을 때 호출됩니다.
- **로직 수정:** 기존 코드에서는 프로젝트를 선택해도 `selectedProjectId`가 `null`로 설정되어, 선택된 프로젝트의 상세 정보를 화면에 표시할 수 없었습니다. 이 부분을 수정하여, 파라미터로 받은 `id`를 `selectedProjectId`에 저장하도록 변경했습니다.
- **기대 효과:** 이제 사용자가 프로젝트를 선택하면, 해당 프로젝트의 `id`가 `projectsState`에 올바르게 저장됩니다. 이 상태 값은 `SelectedProject` 컴포넌트를 렌더링하는 데 사용되어, 사용자는 선택한 프로젝트의 상세 내용을 볼 수 있게 됩니다.

---

## 2. `src/components/SelectedProject.jsx`: 태스크 컴포넌트 추가

`SelectedProject.jsx`는 선택된 프로젝트의 상세 정보를 표시하는 역할을 합니다. 여기에 해당 프로젝트에 속한 태스크를 표시하는 기능을 추가했습니다.

### 변경 전

```jsx
// src/components/SelectedProject.jsx

export default function SelectedProject({ project, onDelete }) {
  // ... (기존 코드)
  return (
    <div>
      <header>
        {/* ... (프로젝트 제목, 날짜, 삭제 버튼) */}
      </header>
      <p>{project.description}</p>
      {/* Tasks 컴포넌트가 없었음 */}
    </div>
  );
}
```

### 변경 후

```jsx
// src/components/SelectedProject.jsx

import Tasks from "./Tasks"; // 1. Tasks 컴포넌트 import

export default function SelectedProject({ project, onDelete }) {
  // ... (기존 코드)
  return (
    <div>
      <header>
        {/* ... (프로젝트 제목, 날짜, 삭제 버튼) */}
      </header>
      <p>{project.description}</p>
      <Tasks /> {/* 2. Tasks 컴포넌트 렌더링 */}
    </div>
  );
}
```

### 설명

1.  **`Tasks` 컴포넌트 임포트:** 선택된 프로젝트의 태스크 목록을 보여주기 위해 `Tasks.jsx` 컴포넌트를 임포트했습니다.
2.  **`Tasks` 컴포넌트 렌더링:** 프로젝트 상세 정보 하단에 `<Tasks />` 컴포넌트를 추가하여, 해당 프로젝트와 관련된 태스크들이 표시되도록 했습니다. 현재는 `Tasks` 컴포넌트에 별도의 props를 전달하고 있지 않지만, 추후 선택된 프로젝트의 태스크 목록을 필터링하여 전달하는 로직이 추가될 것입니다.

---

## 3. `src/components/NewProject.jsx`: `onCancel` prop 오타 수정

`NewProject.jsx`는 새로운 프로젝트를 추가할 때 사용되는 폼 컴포넌트입니다.

### 변경 전

```jsx
// src/components/NewProject.jsx

export default function NewProject({ onAdd, onCancle }) { // 'onCancle' 오타
  // ...
  return (
    // ...
    <button onClick={onCancle}>Cancel</button> // 'onCancle' 사용
    // ...
  );
}
```

### 변경 후

```jsx
// src/components/NewProject.jsx

export default function NewProject({ onAdd, oncancel }) { // 'oncancel'로 수정
  // ...
  return (
    // ...
    <button onClick={oncancel}>Cancel</button> // 'oncancel' 사용
    // ...
  );
}
```

### 설명

- **prop 이름 오타 수정:** `onCancle`로 잘못 작성되었던 prop 이름을 `oncancel`로 수정했습니다. 리액트에서 prop 이름은 JSX 속성으로 전달될 때 camelCase 컨벤션을 따르는 것이 일반적이지만, 여기서는 `oncancel`로 사용되고 있어 일관성을 위해 수정했습니다.
- **중요성:** prop 이름의 일관성은 컴포넌트의 재사용성과 예측 가능성을 높이는 데 중요합니다. 사소해 보일 수 있지만, 이러한 디테일이 모여 유지보수하기 좋은 코드를 만듭니다.

---

이번 변경 사항들을 통해 사용자는 이제 프로젝트를 선택하고 관련 정보를 볼 수 있으며, 앞으로 추가될 태스크 관리 기능의 기반을 마련했습니다. 코드의 각 부분이 어떻게 상호작용하며 전체적인 기능을 완성해 나가는지 이해하는 데 도움이 되셨기를 바랍니다.
