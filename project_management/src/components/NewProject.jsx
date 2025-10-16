import Input from "./input";
import { useReducer } from "react";
import { useRef } from "react";
import Modal from "./Modal";

export default function NewProject({ onAdd }) {
  const modal = useRef();

  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === "" // 위 항목 중 하나라도 비어있는 경우 "오류모달" 표시
    ) {
      // 에러 모달창 뛰우는 코드
      modal.current.open();
      return;
    }
    //vaildation

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    }); // App 컴포넌트에서 예상하는 형태
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2>Invalid Input</h2>
        <p>Oops ... looks like you forgeot to enter a value.</p>
        <p>Please make sure you provide a valid value for every input field.</p>
      </Modal>
      {/* 
      위 ref: 검증코드에서 modal.current 호출할 때 사용가능
      */}
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button className="text-stone-800 hover:text-stone-950">
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label="title" />
          <Input ref={description} label="Description" textarea={true} />
          <Input type="date" ref={dueDate} label="Due Date" />
          {/* 
        (주의) Input 커스텀 컴포넌트임. 내장 html 아님
        => ref를 일반 프로터티처럼 사용하는 대신 Input 컴포넌트 파일로 가서 이 컴포넌트를 fowardRef로 감싸기
        (forwardRef 는 React)
        */}
        </div>
      </div>
    </>
  );
}
