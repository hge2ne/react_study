
# 데이터 Fetching 및 에러 핸들링 기능 추가

## 1. 개요

이번 코드 변경의 핵심 목표는 백엔드 API로부터 데이터를 비동기적으로 가져오고, 이 과정에서 발생할 수 있는 다양한 상태(로딩, 성공, 에러)를 사용자에게 명확하게 보여주는 것입니다. 이를 위해 `AvailablePlaces` 컴포넌트를 중심으로 데이터 Fetching 로직을 강화하고, 사용자 경험을 해치지 않도록 견고한 에러 핸들링 체계를 구축했습니다.

---

## 2. 핵심 개념

### A. 비동기 데이터 Fetching 과 `useEffect`

React 컴포넌트가 렌더링된 후에 외부 API로부터 데이터를 가져오는 것과 같은 Side Effect를 처리하기 위해 `useEffect` 훅을 사용합니다. `useEffect` 내에서 `async/await` 구문을 활용하여 비동기 통신 코드를 동기적인 코드처럼 간결하게 작성할 수 있습니다.

### B. Fetch 상태 관리를 위한 `useState`

비동기 작업은 즉시 완료되지 않으므로, 현재 어떤 상태인지를 추적해야 합니다.
- `isFetching`: 데이터 요청은 시작했지만 아직 응답을 받지 못한 '로딩' 상태를 관리합니다.
- `availablePlaces`: 요청이 성공했을 때 받아온 데이터를 저장합니다.
- `error`: 요청이 실패했을 때 에러 정보를 저장하여 사용자에게 에러 상황을 알리는 데 사용됩니다.

### C. `try...catch`를 이용한 선제적 에러 핸들링

네트워크 요청은 언제든 실패할 수 있습니다. `try...catch` 구문을 사용하면 `fetch` 요청 실패나 서버의 비정상 응답 같은 예외적인 상황을 감지하고, 에러 처리 로직(예: `error` 상태 업데이트)을 실행하여 애플리케이션이 예기치 않게 중단되는 것을 방지합니다.

### D. 조건부 렌더링 (Conditional Rendering)

`isFetching`, `error`와 같은 상태 값에 따라 다른 UI를 보여주는 React의 핵심 패턴입니다.
- `error` 상태가 존재하면 에러 메시지 컴포넌트를 렌더링합니다.
- `isFetching` 상태가 `true`이면 로딩 인디케이터를 렌더링합니다.
- 모든 데이터가 성공적으로 로드되면 실제 데이터를 보여주는 컴포넌트를 렌더링합니다.

---

## 3. 상세 변경 내역

### A. `src/components/Error.jsx` 컴포넌트 신규 생성

에러 상황 시 사용자에게 일관된 UI를 보여주기 위한 재사용 가능한 컴포넌트를 생성했습니다.

- **파일 경로:** `src/components/Error.jsx`
- **역할:** `title`과 `message`를 props로 받아 에러 내용을 표시합니다.

```javascript
// src/components/Error.jsx

export default function Error({ title, message, onConfirm }) {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
      {onConfirm && (
        <div id="confirmation-actions">
          <button onClick={onConfirm} className="button">
            Okay
          </button>
        </div>
      )}
    </div>
  );
}
```

### B. `src/components/AvailablePlaces.jsx` 로직 수정

기존 데이터 Fetching 로직에 로딩 상태와 에러 핸들링 기능을 추가했습니다.

- **파일 경로:** `src/components/AvailablePlaces.jsx`

#### 1. Import 구문 추가

- `Error.jsx` 컴포넌트를 `ErrorPage` 라는 이름으로 가져옵니다.

```javascript
// 이전
import Places from './Places.jsx';
import {useState, useEffect} from 'react'

// 이후
import Places from './Places.jsx';
import {useState, useEffect} from 'react'
import ErrorPage from './Error.jsx'
```

#### 2. `error` 상태 변수 추가

- `useState`를 사용하여 API 요청 실패 시 에러 정보를 저장할 `error` 상태를 추가했습니다.

```javascript
// ...
export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [error,setError] = useState() // [추가] 에러 상태
// ...
```

#### 3. `useEffect` 내 비동기 로직 수정

- `fetchPlaces` 함수 내부를 `try...catch` 블록으로 감싸 에러를 처리합니다.
- 서버 응답이 `ok`가 아닐 경우, `throw new Error()`를 통해 의도적으로 에러를 발생시켜 `catch` 블록으로 넘깁니다.
- `catch` 블록에서는 `setError`를 호출하여 `error` 상태를 업데이트합니다.

```javascript
// ...
  useEffect(()=> {
    async function fetchPlaces(){
      setIsFetching(true); // [변경] 로직 시작 시 로딩 상태 true로 설정

      try {
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json();

        // [추가] HTTP 상태 코드가 2xx가 아닐 경우 에러 처리
        if (!response.ok) {
          throw new Error('Failed to fetch places'); 
        }

        setAvailablePlaces(resData.places); // [변경] 성공 시 데이터 저장

      } catch (error) {
        // [추가] 네트워크 에러나 위에서 throw된 에러를 여기서 처리
        setError({
          message: error.message || 'Could not fetch places, please try again later.'
        });
      }

      setIsFetching(false); // [추가] 로직 종료 시 로딩 상태 false로 설정
    }

    fetchPlaces();
  },[]);
// ...
```

#### 4. 조건부 에러 UI 렌더링 추가

- `return` 구문 이전에 `error` 상태를 확인하는 로직을 추가했습니다.
- `error`가 존재할 경우, `ErrorPage` 컴포넌트를 렌더링하여 사용자에게 에러 상황을 명확히 알립니다.

```javascript
// ...
  },[])

  // [추가] error 상태가 존재하면 ErrorPage 컴포넌트를 렌더링
  if (error){
    return <ErrorPage title="An error occurred!" message={error.message}/>
  }

  return (
// ...
```

---

## 4. 코드 리뷰 및 개선 제안

시니어 개발자의 관점에서 현재 코드의 몇 가지 잠재적인 문제점과 개선 방안을 제안합니다.

1.  **`setAvailablePlaces(false)` 버그:**
    - 현재 `catch` 블록 이후에 `setAvailablePlaces(false)`가 호출되고 있습니다. 이는 에러 발생 여부와 관계없이 항상 장소 목록을 `false`로 설정하여 화면에 아무것도 나타나지 않게 만듭니다.
    - **수정 제안:** `setAvailablePlaces(resData.places)`는 `try` 블록 안으로, `setIsFetching(false)`는 `try...catch` 구문이 모두 끝난 마지막에 위치시켜야 합니다. (위 상세 변경 내역에 수정된 코드로 반영했습니다.)

2.  **`isLoading` Prop 하드코딩:**
    - `<Places>` 컴포넌트에 `isLoading={true}`로 값이 고정되어 전달되고 있습니다. 이렇게 되면 데이터 로딩이 끝나도 계속 로딩 인디케이터가 보이게 됩니다.
    - **수정 제안:** `isLoading={isFetching}`으로 변경하여 `isFetching` 상태가 동적으로 반영되도록 해야 합니다.

    ```javascript
    // src/components/AvailablePlaces.jsx

    // ...
    return (
      <Places
        title="Available Places"
        places={availablePlaces}
        isLoading={isFetching} // true -> isFetching 으로 변경
        loadingText="Fetching place data..."
        fallbackText="No places available."
        onSelectPlace={onSelectPlace}
      />
    );
    ```
