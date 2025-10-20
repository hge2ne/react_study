import { useState, memo } from "react";

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
  const initialCountIsPrime = isPrime(initialCount);

  const [counter, setCounter] = useState(initialCount);

  function handleDecrement() {
    setCounter((prevCounter) => prevCounter - 1);
  }

  function handleIncrement() {
    setCounter((prevCounter) => prevCounter + 1);
  }

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
});

export default Counter;
