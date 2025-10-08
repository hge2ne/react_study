import { useState } from "react";
export default function Player() {
  // 과제 : 컴포넌트 작동시켜서 이름 설정하도록 하기
  const [enteredPlayerName, setEnteredPlayerName] = useState(null); //useState 로 state 생성
  // enteredPlayerName : input란과 연결되어 현재 값을 출력할수있게 해주는 상태
  const [submitted, setSubmitted] = useState(false); //초기값 false 설정
  // submitted : 버튼을 눌렀는지 확인하는 상태

  function handleChange(event) {
    //설정한 이름 유지하려면?(위치 주의)
    setSubmitted(false);
    setEnteredPlayerName(event.target.value); //함수로 반환값 설정
  }

  function handleClick() {
    // 아래 버튼과 연결
    setSubmitted(true); // true 로 상태 바뀌면
  }
  return (
    <section id="player">
      <h2>Welcome {submitted ? enteredPlayerName : "unknown entity"}</h2>{" "}
      {/* 값이 true 라면 enteredPlayerName에 출력하고, 값이 false 라면,'unknown entity' (알수없는사용자)를 출력 */}
      <p>
        <input type="text" onChange={handleChange} value={enteredPlayerName} />{" "}
        {/* 위에서 생성한 상태를 value 속성으로 input 필드에 추가(최신값 반영) */}
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
