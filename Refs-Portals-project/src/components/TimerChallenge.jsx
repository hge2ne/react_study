import { useState, useRef } from "react";
//let timer; 함수 바깥에 변수 선언하면 이하의 두 함수 모두 변수 사용 가능
// 위 변수는 함수 안에 있으면 안됨. 함수 안에 있으면 컴포넌트 재실행시마다 재선언되기 때문
// 함수 사용하면 각 타이머 분리 안됨 (참조로 해결하기)
// 참조 기능 활용: 값을 제어하기 위해 사용
export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();

  cosnt[(timerStarted, setTimerStarted)] = useState(false);
  const [timeerExpired, setTimerExpired] = useState(false);

  function handleStart() {
    // 타이머 함수

    timer.current = setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);
    setTimerExpired(true);
  }

  function handleStop() {
    //타이머 멈추는 함수 (타이머함수에 접근하는 방법 => refs)
    clearTimeout(timer.current); //Timeout 내장함수 사용하려면 포인터 필요
  }
  return (
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
  );
}
