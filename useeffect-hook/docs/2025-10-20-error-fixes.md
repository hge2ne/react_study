# 2025년 10월 20일 오류 수정 내역

이 문서에는 렌더링 문제를 해결하기 위해 프로젝트 전체에서 수정된 사항들이 기록되어 있습니다.

## `src/App.jsx` 수정

`App.jsx` 컴포넌트에서 여러 로직 오류와 오타가 발견되어 수정되었습니다.

- **상태 초기화 로직 수정**:
  - `pickedPlaces` 상태가 `localStorage`에서 불러온 장소들로 올바르게 초기화되도록 수정했습니다.
  - `availablePlaces` 상태는 초기에 빈 배열로 설정되고, 사용자 위치 정보 확인 후에 정렬된 목록으로 업데이트되도록 수정했습니다.

- **`setAvailablePlaves` 오타 수정**:
  - `setAvailablePlaves`라는 오타를 `setAvailablePlaces`로 바로잡았습니다.

- **`Modal` 컴포넌트 `open` prop 수정**:
  - `Modal` 컴포넌트에 `ModalIsOpen`으로 잘못 전달되던 `open` prop을 `modalIsOpen`으로 수정했습니다.

- **`handleStartRemovePlace` 함수 수정**:
  - 장소 `id`를 인자로 받아 `selectedPlace.current`에 저장하도록 수정하여, 삭제할 장소를 올바르게 참조하도록 했습니다.

- **`handleSelectPlace` 함수 로직 수정**:
  - 장소를 선택했을 때 `pickedPlaces` 상태에 추가하고 `localStorage`를 업데이트하는 로직을 이 함수로 이동시켰습니다.

- **`handleStopRemovePlace` 함수 단순화**:
  - 이 함수는 모달을 닫는 역할만 하도록 불필요한 상태 업데이트 로직을 제거했습니다.

- **`useEffect` 로직 개선**:
  - 컴포넌트가 마운트될 때 `localStorage`에서 저장된 장소를 불러오는 로직과 사용자 위치를 가져와 장소를 정렬하는 로직을 하나의 `useEffect` 훅 안에서 처리하도록 구조를 개선했습니다.

## `src/components/ProgressBar.jsx` 수정

`ProgressBar.jsx` 컴포넌트에서 발견된 오류들은 다음과 같이 수정되었습니다.

- **`useState` 오타 수정**:
  - `ustState`를 `useState`로 수정하여 React Hook이 올바르게 임포트되도록 했습니다.

- **`timer` prop 구조 분해 할당**:
  - 컴포넌트 시그니처를 `function ProgressBar(timer)`에서 `function ProgressBar({ timer })`로 변경하여 `timer` prop을 올바르게 받도록 수정했습니다.

- **`<progress>` 요소의 `max` 속성 수정**:
  - 정의되지 않은 `TIMER` 변수 대신, prop으로 전달받은 `timer` 값을 `max` 속성에 사용하도록 수정했습니다.
