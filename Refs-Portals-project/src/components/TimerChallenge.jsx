import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";
//let timer; 함수 바깥에 변수 선언하면 이하의 두 함수 모두 변수 사용 가능
// 위 변수는 함수 안에 있으면 안됨. 함수 안에 있으면 컴포넌트 재실행시마다 재선언되기 때문
// 함수 사용하면 각 타이머 분리 안됨 (참조로 해결하기)
// 참조 기능 활용: 값을 제어하기 위해 사용
export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  cosnt[(timerStarted, setTimerStarted)] = useState(false);
  const [timeerExpired, setTimerExpired] = useState(false);

  function handleStart() {
    // 타이머 함수
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      dialog.current.open();
    }, targetTime * 1000);
    setTimerExpired(true);
  }

  function handleStop() {
    //타이머 멈추는 함수 (타이머함수에 접근하는 방법 => refs)
    clearTimeout(timer.current); //Timeout 내장함수 사용하려면 포인터 필요
  }
  return (
    <>
      {timeerExpired && (
        <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
        /* ResultModal : 기본적으로 보이지 않음, DOM 의 일부분도 아니기 때문에 항상 렌더링되어도 문제 없음
        잘 작동하려면 React version 19 이상이어야 함 (구 React 에서 동작x) 
        구버전에서는 forwardRef 라는 내장함수 사용(구 리액트 버전의 pj 작업할 일도 많고, 사용할 일 많으니 알아두기)
        사용법 : 
        1. 함수 전체를 forwardRef 로 감싼 후 상수에 저장함
        2. 파일 밖에서 사용할 수 있도록 export
        3. forwardRef 함수의 파라미터: 기존 파라미터 , ref
        


        */
      )}{" "}
      {/* TimerChallenge 함수 props 전달받음 */}
      <section className="chanllenge">
        {" "}
        {/* className : css 클래스 부여 */}
        <h2>{title}</h2>
        {timeerExpired && <p>You lost!</p>}
        <p className="challenge-time"></p> {/* 남은 시간을 사용자에게 보여줌 */}
        {targetTime} second{targetTime > 1 ? "s" : ""}{" "}
        {/* 게임을 위한 타이머 기능 구현 1초 이상일때만 s 붙도록 조건 처리 */}
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
