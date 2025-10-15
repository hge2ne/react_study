import Input from "./input";
import { useReducer } from "react";
import { useRef } from "react";

export default function NewProject({ onAdd }) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    //vaildation

    onAdd({
      tilte: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    }); // App 컴포넌트에서 예상하는 형태
  }

  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button className="text-800 hover:text-stone-950">Cancel</button>
        </li>
        <li>
          <button
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone 950"
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
  );
}
