import { useState, useRef } from "react"; // 리액트에서 참조 값 생성법
// useRef : 리액트 내장 훅 함수(컴포넌트 함수, 커스텀훅 안에서만 호출 가능 )
export default function Player() {
  /* refs 참조 활용하면 컴포넌트 간소화 가능
  리액트에서 참조 : 값을 의미함
   */
  const playerName = userRef(); //Ref 생성하면 상수로 사용가능
  const [enteredPlayerName, setEnteredPlayerName] = useState(null); //useState 로 state 생성
  // enteredPlayerName : input란과 연결되어 현재 값을 출력할수있게 해주는 상태
  const [submitted, setSubmitted] = useState(false); //초기값 false 설정
  // submitted : 버튼을 눌렀는지 확인하는 상태

  function handleChange(event) {
    setSubmitted(false);
    setEnteredPlayerName(event.target.value); //함수로 반환값 설정
  }

  function handleClick() {
    setEnteredPlayerName(playerName.current.value); //playerName : js 객체이며 항상 current 속성 가지고 있음
    //current 속성 : 실제 참조값 가지고있음(연결된 input 저장됨)

    // 아래 버튼과 연결
    setSubmitted(true); // true 로 상태 바뀌면
  }
  return (
    <section id="player">
      <h2>
        Welcome {enteredPlayerName ? enteredPlayerName : "unknown entity"}
        {/* enteredPlayerName ?? 로 단축 가능.
        참고 사용 목적: 1. 값을 읽어오고 싶을 때 코드 간소화 가능(간결한 컴포넌트) */}
      </h2>{" "}
      {/* 값이 true 라면 enteredPlayerName에 출력하고, 값이 false 라면,'unknown entity' (알수없는사용자)를 출력 */}
      <p>
        <input ref={playerName} type="text" />{" "}
        {/* 위에서 생성한 상태를 value 속성으로 input 필드에 추가(최신값 반영) */}
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
