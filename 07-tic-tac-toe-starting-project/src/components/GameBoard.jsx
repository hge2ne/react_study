import { useState } from "react";

export default function GameBoard({onSelectSquare, board}) { 

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
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
