import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react"; 
import Log from "./components/Log"; // 


function App() {
  const [gameTurns, setGameTurns]=useState([]); // 버튼 하나 클릭할 때마다 배열에 순서를 하나씩 추가
  const [activePlayer, setActivePlayer]  = useState('X'); //player1 상태
/* handleSelectSquare() : Player.jsx에서 만들어진. 사용자가 선택한 칸의 정보를 가져오는 함수 */
  function handleSelectSquare(){ // Log 기능 구현할떄 재사용
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns();
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player"> {/* css 추가 */}
          <Player initailName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player initailName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
      </div>
      <Log />
    </main> 
  );
}
// asdfasdfasdf
/*
asefas
asdfa
dfasd
fasdf
*/

/**
 * docs 문서작성
 */



export default App;
