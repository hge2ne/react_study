import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = function Modal({ open, children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]); // open 속성을 의존성배열로 추가
  /*
  위 useEffect 코드 목적 : 특정값 초기화(open 속성을 DOM API 또는 특정 행동과 동기화 하는 작업)
  Effect 의존성 배열 개념 :
  - effect 함수 내에서 사용되는 속성, 상태값을 의미함(속성값이 없는 경우, 빈배열을 넣기도 함)
  - 의존성 배열로 속성, 상태값을 넣을 경우, 상태 변경되는 경우 컴포넌트를 재실행함. 
  -> 의존성 속성,상태값 : 컴포넌트 함수를 다시 실행할지말지 결정하는 기준(변경시, 실행되도록)

  in Modal.jsx
  - open 이라는 속성 사용하기 때문에 이 속성이 변경가능하므로, 속성 값을 의존성배열로 추가해야함
  - 마운트 : 어떤 컴포넌트가 처음으로 DOM 에 커밋되는 순간(초기 렌더결과가 실제로 DOM 에 붙은 상태)
  - 렌더링 : 컴포넌트함수가 호출되어, 브라우저가 jsx를 계산하는 단계
  (주의) 이때 DOM 조작 하지않음, 렌더링 여러번 발생하기도 함
  - 커밋 : 리액트가 코드를 실제 DOM에 반영하는 단계(렌더링과정에서 계산된 jsx를 반영)
  
  */

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
