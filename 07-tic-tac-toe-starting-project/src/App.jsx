import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react"; 


function App() {
  const [activePlayer, setActivePlayer]  = useState('X'); //player1 상태
/* handleSelectSquare() : Player.jsx에서 만들어진. 사용자가 선택한 칸의 정보를 가져오는 함수 */
  function handleSelectSquare(){ 
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
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
