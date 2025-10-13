import { useState, useRef, forwardRef } from "react";
import ResultModal from "./ResultModal.jsx";
//let timer; 함수 바깥에 변수 선언하면 이하의 두 함수 모두 변수 사용 가능
// 위 변수는 함수 안에 있으면 안됨. 함수 안에 있으면 컴포넌트 재실행시마다 재선언되기 때문
// 함수 사용하면 각 타이머 분리 안됨 (참조로 해결하기)
// 참조 기능 활용: 값을 제어하기 위해 사용
export default function TimerChallenge({
  title,
  targetTime,
  remainingTime,
  onSubmit,
}) {
  const timer = useRef();
  const dialog = useRef();
  const userLost = remainingTime <= 0;
  const [timeRemaing, setTImeRemaining] = useState(targetTime * 1000); //handleStart 함수와 동기화(10ms)
  const timerIsActive = timeRemaing > 0 && timeRemaing < target * 1000; // 타이머 활성화되는 조건
  const ResultModal = forwardRef({ onReset });
  //타이머 수동조작 기능(시간내에 사용자가 타이머를 잘 멈춘 경우 모달창 띄움)
  if (timeRemaing <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }
  function handleStart() {
    // 타이머 함수
    timer.current = setInterval(() => {
      setTImeRemaining((prevTimeRemaining) => prevTimeRemaining - 10); //업데이트된 timeRemainingdmfh 10ms 마다 업데이트 됨
      /* 남은시간 측정해서 점수 기록 띄워주는 기능 구현
      간격 설정 필요 => 브라우저 내장함수 setInterval 사용 */
    }, 10); // 시간단위가 아닌 짧은 시간으로 설정 (밀리초)
  }
  function handleReset() {
    setTImeRemaining(targetTime * 1000);
  }

  // handleStop(): 게임 미션에 실패했을 때 모달창 띄우는 함수
  function handleStop() {
    //타이머 멈추는 함수 (타이머함수에 접근하는 방법 => refs)
    clearInterval(timer.current); //Timeout 내장함수 사용하려면 포인터 필요
    clearInterval(timer.current);
  }
  return (
    <>
      {timeerExpired && (
        <ResultModal
          ref={dialog}
          targetTime={targetTime}
          remainingTime={timeRemaing}
          onReset={handleReset}
        />
        //remainingTime 속성 추가
      )}{" "}
      <form method="dialog" onSubmit={onReset}></form>
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
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
