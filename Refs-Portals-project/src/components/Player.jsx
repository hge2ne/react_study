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
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = "";
    /* 위 코드 : input의 값을 빈 문자열로 설정하라고 명령하고 있음. 리액트는 선언식임. (리액트 규칙; DOM 상호작용은 리액트가 해야함)

    */

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
/* 참조 기능을 html 요소와 연결하지 않고 사용하는 법



참조 vs 상태 (차이점) 

state (상태): 
- 상태 업데이트 함수를 통해 변화가 있을 경우 컴포넌트 재실행됨
- 사용하는 경우 : 상태값은 컴포넌트 재실행을 발생시키므로 UI 에 바로 반영되어야 하는 값에 사용
- 사용하지 않는 경우 : 시스템 내부에 보이지 않는 쪽에서 다루는 값 혹은 UI에 직접적인 영향을 끼치지 않는 값에 사용하지 않음


refs (참조):
- 참조값이 바뀌어도 컴포넌트 재실행되지 않음
- 사용하는 경우: DOM 요소에 직접적인 접근 필요할 때 사용, 현재 input 필드에 입력되는 값 받아오기
*/
