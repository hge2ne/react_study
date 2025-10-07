import { useState } from "react";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({onSelectSquare, activePlayerSymbol}) {
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
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
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
