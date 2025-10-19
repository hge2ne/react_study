//입력란 오류 모달 만들기
//파일이름을 errorModal이 아닌 Modal 로 하는 이유? 재사용 가능
import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = forwardRef(function Modal(
  { children, buttonCaption, onCLose, open },
  ref
) {
  // 주의! ref 위치: 1번째 prop{} 안x {} 밖 2번째 prop 위치에 있어야함
  const dialog = useRef();
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.showModal();
    }
  }, [open]);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
        {/* 
        모달창 닫는 버튼
        */}
      </form>
    </dialog>,
    document.getElementById("modal-root")
  ); // document.getElementById: 모달 렌더링할 위치 추가
});

export default Modal;
