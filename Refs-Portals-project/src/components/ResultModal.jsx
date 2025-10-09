import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(function ResultModal({
  remainingTime,
  targetTime,
  ref,
}) {
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  // forwardRef 와 useImperativeHandle 덕분에 객체(dialog)와의 연결이 구현된 것
  //{dialog}의 객체를 TimerChallenge.jsx에서 ResultModal이 받음

  return (
    <dialog ref={dialog} className="result-modal" open>
      {" "}
      {/* 이 내장 dialog 요소가 기본적으로 눈에 보이지 않음(open 속성 추가해서 해결) 
      만약 모달창을 반투명하게 하는 효과 등을 사용하려면 open 속성 말고, 참고 기능 활용해야함
      refs 로 dialog 접근하기
      1. TimerChallenge 컴포넌트 내에서 ref 생성
      2. ResultModal 컴포넌트로 가서 ref 프로터피 추가
      단점 : 협업 pjdptjsms 컴포넌트 혼용으로 인한 오류 발생가능성 이있음
      보완법 : useImperativeHandle 훅 사용
      (ResultModal 컴포넌트 설계시, 해당 컴포넌트 외부에서 ref 를 통해 호출할 수 있는 함수가 노출되도록 하기)
      => 컴포넌트 함수 내에서 호출해서 컴포넌트 외부에서 접근 가능한 속성, 메서드 정의 가능(컴포넌트 안정화, 재사용성 증가)
      
      
      
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
