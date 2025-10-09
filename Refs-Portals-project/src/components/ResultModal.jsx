import { forwardRef } from "react";

const ResultModal = forwardRef(function ResultModal({
  result,
  targetTime,
  ref,
}) {
  return (
    <dialog ref={ref} className="result-modal" open>
      {" "}
      {/* 이 내장 dialog 요소가 기본적으로 눈에 보이지 않음(open 속성 추가해서 해결) 
      만약 모달창을 반투명하게 하는 효과 등을 사용하려면 open 속성 말고, 참고 기능 활용해야함
      refs 로 dialog 접근하기
      1. TimerChallenge 컴포넌트 내에서 ref 생성
      2. ResultModal 컴포넌트로 가서 ref 프로터피 추가
      
      
      */}
      <h2>You {result}</h2>
      <p>
        The tatget time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X second left.</strong>
      </p>
      <form action="dialong">
        {" "}
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
