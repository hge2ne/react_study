/**
 *@DeleteConfirmation : DOM 에 포함된 부분임(App 컴포넌트 최초 렌더링 시, 해당 타이머도 설정되고 시작되는 문제 발생)
해결방법 : DeleteConfirmation()을 modalsOpen 조건부로 렌더링
=> App.jsx에서 작업
 */

import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const TIMER = 3000;
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // useEffect 사용해서 Effect함수와 의존성 배열 넣기
  useEffect(() => {
    console.log("TIMER SET");
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);
    // DeleteConfirmation 컴포넌트가 DOM 에서 삭제될때마다 타이머 멈춤

    return () => {
      clearTimeout(timer);
    };
    /* 
    위 cleanup 함수 : 리액트에 의해 실행됨. 그 시점이 이 effect 함수가 다시 작동하기 바로 전이나, 
    DeleteConfirmation 컴포넌트가 사라지기 바로전(DOM에서 삭제되기 전) 실행됨
    (주의) 의존성 배열 설정하면 cleanup 함수 => Effect 함수가 다시 작동할 때 실행되고 cleanup함수는 그 직전인 Effect 함수가 작동하기 바로전에 실행됨
    */
  }, [onConfirm]); // 문제발생(함수를 의존성배열로 설정). 종속성으로 함수 추가할때는 무한루프발생가능성 있음. 이 코드에서는 발생 x(컴포넌트가 사라지도록 코딩했기 때문)
  // 하지만 코딩 제대로 안해서 모달창 사라지는 코드 실행안되면 무한루프 발생함.

  /*
  사실 타이머 기능에는 Effect 기능 필요없음(무한루프 발생 x)
  해결해야할 문제 : 컴포넌트 함수가 사라질때 cleanup 함수로 타이머 내용 삭제하기
  => useEffect 로 해결가능
  */

  /*
  setTimeout : 모달창 닫힘 추적하는 함수
  2개 인수받음
  1번째 인수 : 함수
  2번째 인수 : 밀리초 단위 시간
  (3000 ms : 3초)
  - 3초 뒤에 이 모달을 닫으려면 3초 뒤에 실행되는 onConfirm 함수를 콜백함수 안에 넣어야함
  => 
  
  */
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      {/* 
      내장 요소 progress 추가. 
      기능 : 모달 진행표시줄(남은 시간에 따라 표시줄이 줄어들면서 타이머 설정 및 만료 시 장소가 삭제될 예정이라고 알림)
      max={TIMER} : 3000 ms 가 진행 표시줄 상태의 최댓값이 됨
      */}
      <ProgressBar timer={TIMER}></ProgressBar>
    </div>
  );
}
