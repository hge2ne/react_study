import { useState, useEffect } from "react";

export default function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer); // 매초 여러번 업데이트해야 부드러운 진행표시줄 만들수있음
  /**
   * @setInterval : 브라우저 내장요소
   * - 함수를 정의하여 매 몇 밀리초마다 실행되도록 함
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress value={remainingTime} max={timer} />;
}
