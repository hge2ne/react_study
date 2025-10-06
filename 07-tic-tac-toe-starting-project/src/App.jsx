import Player from "./components/Player";
import GameBoard from "./components/GameBoard";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol>
          <Player initailName="Player 1" symbol="X" />
          <Player initailName="Player 2" symbol="O" />
        </ol>
        <GameBoard />{/* 여기!! */}
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
