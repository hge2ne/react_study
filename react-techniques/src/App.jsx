import { useState } from "react";

import Counter from "./components/Counter/Counter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";
import ConfigureCounter from "./components/Counter/ConfigureCounter.jsx";

function App() {
  log("<App /> rendered");

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    setChosenCount(newCount);
    //setChosenCount(chosenCount + 1) : useState 초기값 0 받아와서 시작(출력 1)
    setChosenCount((prevChosenCount) => prevChosenCount + 1);
    /* 
    위 방법 : state 업데이트 함수웨 함수 전달
    => 그 함수가 이전 state 스냅샷 전달 받고 그 새로운 state 스냅샷 반환
    (리액트가 가장 최신 state 스냅샷 보장. 이때 받는 newCount 값은 setChosenCount(newCount) stata업데이트에서 설정된 값 )
    - 여러 state 업데이트 실행되는 경우, 순서대로 실행됨
    - 배칭 이란? :
    같은 함수 내에서 여러 state 업데이트가 있을 때 다같이 배칭되어서 컴포넌트 1회만 실행하는 것
     */
  }
  // 새로운 카운트를 입력값과 매개변수로 받는 용도
  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount} />
        <Counter key={chosenCount} initialCount={chosenCount} />
        {/* 
        - key 속성명 중복 사용 금지
        - 위 key={chosenCount} 패턴 : useEffect 없이 컴포넌트 함수 재설정하는 방법임.
        - key 값이 바뀔때마라 state도 바뀜 
        -> 리액트는 이전 컴포넌트 인스턴스를 삭제한 다음 재생성함
        - 위 패턴은 외부에서 UI 로 사용자에게 보여지는 컴포넌트 내에 변경될 수 있는 state 가 있는 경우에 사용함
        - 불필요한 렌더링 방지

        */}
        <Counter initialCount={0} />
        {/* 
        (주의) 컴포넌트 함수에 등록된 상태는 해당 컴포넌트 범위 내에 속해있음
        (컴포넌트 호출될때마다 같이 재생성됨)
        - 함수 호출된 곳이 여러곳일때 각 컴포넌트는 모두 각자의 상태를 가짐
        -(주의) state 상태는 공유되지 않음
        - 함수 기반으로 여러 컴포넌트 "인스턴스"를 만들면 모든 인스턴스는 각자의 상태 가짐
        - state 는 리액트가 위치에 따라 추적함

        */}
      </main>
    </>
  );
}

export default App;
