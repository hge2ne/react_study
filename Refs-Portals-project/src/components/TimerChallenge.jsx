import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";

// let timer;

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000); //handleStart 함수와 동기화(10ms)
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000; // 타이머 활성화되는 조건

  //타이머 수동조작 기능
  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    setTimeRemaining(targetTime * 1000); //초기 targetTime * 1000 으로 다시 설정해줌(상태설정은 컴포넌트 재실행을 발생시키지만 If문이라면 괜찮음)
    dialog.current.open();
  }
  function handleStart() {
    // 타이머 함수
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10); //업데이트된 timeRemainingdmfh 10ms 마다 업데이트 됨
      /* 남은시간 측정해서 점수 기록 띄워주는 기능 구현
      간격 설정 필요 => 브라우저 내장함수 setInterval 사용 */
    }, 10); // 시간단위가 아닌 짧은 시간으로 설정 (밀리초)
  }

  function handleStop() {
    //타이머 멈추는 함수 (타이머함수에 접근하는 방법 => refs)
    clearInterval(timer.current); //Timeout 내장함수 사용하려면 포인터 필요
  }
  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} />
      <section className="challenge">
        <h2>{title}</h2>
        {/* {timeerExpired && <p>You lost!</p>} */}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}{" "}
          {/* 게임을 위한 타이머 기능 구현 1초 이상일때만 s 붙도록 조건 처리 */}
          <p>
            <button onClick={timerIsActive ? handleStop : handleStart}>
              {timerIsActive ? "Stop" : "Start"} Challenge
            </button>
          </p>
          <p className={timerIsActive ? "active" : undefined}>
            {timerIsActive ? "Time is running..." : "Timer inactive"}
          </p>
        </p>
      </section>
    </>
  );
}
