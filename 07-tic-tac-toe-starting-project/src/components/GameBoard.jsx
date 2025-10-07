import { useState } from "react";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({onSelectSquare, turns}) { // turns 속성 : 배열임
  let gameBoard = initialGameBoard; 
 
  for (const turn of turns) { // 루프 안에서 이미 나온 차례에 대한 정보 추출함
    const {square,player} = turn;
    const {row,col} = square // 객체 구조 분해할당을 2번 실행

    gameBoard[row][col]= player; //gameBoard 컴포 넌트의 파생상태(gameTurns 상태에 기반해서)
  }
 /*  const [gameBoard, setGameBoard] = useState(initialGameBoard); 

  function handleSelectSquare(rowIndex, colIndex) {
   
    setGameBoard((prevGameBoard) => {
      const updatedBoard = prevGameBoard.map((row) => [...row]);
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol; //activePlayerSymbol 속성 여기에 사용
      return updatedBoard;
    });

    onSelectSquare(); // 여기를 호출해야 플레이어가 X <-> O 로 바뀜
  } */

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={()=>onSelectSquare(rowIndex,colIndex)}disabled ={playerSymbol !== null}> {/* disabled 비활성화 속성 추가(버튼 컴포넌트 기본 제공기능)
                {/*
                onSelectSquare 함수에 인수 추가
                행에 대한 rowIndex, 열에 대한 colIndex 을 인수로 보냄
                함수로 보내는 이유? 이것이 onSelectSquare의 속성값이기 때문
                */}
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol> 
        </li>
      ))}
    </ol>
  );
}
