import { useState, memo, useCallback, useMemo } from "react";
import CounterHistory from "../Counter/CounterHistory.jsx";
/* 
useCallback 기능1. 함수 재생성 방지
기능2. 함수를 useEffect의 의존성으로 갖고 있을 때
기능3. memo() 사용할 때 불필요한 재실행 방지할 때
*/

/* 
useMemo 기능1. memo() 사용해서 컴포넌트 함수 재실행 방지할때 컴포넌트 함수 내에 불러온 일반함수를 감싸서 실행 방지해줌
(주의) 복잡 계산 있을때만 사용
- 빈 의존성 배열 있다면 절대 재실행 x

*/

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import { log } from "../../log.js";

function isPrime(number) {
  log("Calculating if is prime number", 2, "other");
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}
const Counter = memo(function Counter({ initialCount }) {
  /* 
memo: (리액트 내장함수) 하는 일?
=> 컴포넌트 함수의 속성을 살펴보고 컴포넌트 함수가 정상적으로 다시 실행될때,
앱 컴포넌트 함수가 실행되면 memo 가 이전 속성값과 새로 받을 속성값을 살펴봄
- 만약 속성값들이 완전히 동일하다면(배열과 객체가 메모리 안에 있는 배열과 객체와 동일하다는 뜻)
이 컴포넌트 함수 실행을 memo가 막음
- (주의) memo 는 부모 컴포넌트(App) 에 의해 함수가 실행되었을 때만 막음
*/

  log("<Counter /> rendered", 1);
  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );
  // Counter 함수 안에서 직접적으로 호출되어 실행되기 때문에 카운트 수가 바뀔때마다 실행됨
  //isPrime(): initailCount 를 값으로 사용하고 있음. 'SetCounter' input에 입력 후 set 버튼 클릭할때만 변경됨

  //const [counter, setCounter] = useState(initialCount);
  const [counterChanges, setCounterChanges] = useState([
    { value: initialCount, id: Math.random() * 1000 },
  ]);

  const currentCounter = counterChanges.reduce(
    (prevCounter, counterChange) => prevCounter + counterChange.value,
    0
  );

  const handleDecrement = useCallback(function handleDecrement() {
    //setCounter((prevCounter) => prevCounter - 1);
    setCounterChanges((prevCounterChanges) => [
      { value: -1, id: Math.random() * 1000 },
      ...prevCounterChanges,
    ]);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    //setCounter((prevCounter) => prevCounter + 1);
    setCounterChanges((prevCounterChanges) => [

      { value: 1, id: Math.random() * 1000 },
      ...prevCounterChanges,
    ]);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          {/* 
          handleDecrement: (주의) Counter 컴포넌트 함수 내에서 생성되었으므로 "중첩함수"(함수 재실행될때마다 재생성됨)
           */}
          Decrement
        </IconButton>
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanges} />
    </section>
  );
});

export default Counter;
