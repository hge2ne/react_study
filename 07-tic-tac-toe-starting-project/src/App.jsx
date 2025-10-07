import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react"; 
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";

/**
 * @diriverActivePlayer : 헬퍼 함수 생성 
 * App 함수 밖에 생성하는 이유 ? 컴포넌트와 관련된 상태, 데이터에 접근할 필요 없음
 */ 



function deriverActivePlayer(gameTurns) {
  let currentPlayer = 'X';

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') { //이전 턴이 기호 X 플레이어의 턴이었다면? 그 다름 차례는 기호 O 플레이어 차례
      // PrevTurns.lengh > 0 : 이전 턴이 존재하지 않는 경우 처리
      currentPlayer = 'O';
    };

    return currentPlayer;

}

function App() {
  const [gameTurns, setGameTurns]=useState([]); // 버튼 하나 클릭할 때마다 배열에 순서를 하나씩 추가
  //const [activePlayer, setActivePlayer]  = useState('X'); // 추가 상태를 제어하지 않도록 주석처리
  // 리액트 핵심 : 상태는 최대한 적게 사용하되, 최대한 많은 값을 파생 및 연산하도록 하는 것
/* handleSelectSquare() : Player.jsx에서 만들어진. 사용자가 선택한 칸의 정보를 가져오는 함수 */
  const activePlayer = deriverActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex,colIndex){ // 어떤 행,어떤 열의 버튼을 눌렀는지 정보 받기위해 인자 rowIndex, colIndex 추가
    //setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    /**
     * @setGameTurns 
     * 역할: 상태를 불변한 방식으로 업데이트하고 다른 상태를 병합하지 않도록 해줌

     */
    setGameTurns(prevTurns => { //게임에 사용된 수에 대한 배열 사용해야하지만 이미 생성된 수 prevTurns가 있으므로 이거 사용
      const currentPlayer = deriverActivePlayer(prevTurns);

      const updatedTurns = [{square: {row: rowIndex, col: colIndex},player:currentPlayer},...prevTurns]; //주의: 불별하는 방식으로 해야함
      //{}부분 중첩객체 표현(행을 rowIndex와 대응, 열을 colIndex와 대응)
      // 어떤 버튼 눌렀는지 확인하기 위해 player 속성 추가(activePlayer 사용하여 현재 진행중인 플레이어 기호 저장 )
      return updatedTurns; // setGameTurns 상태의 새로운 값으로 반환됨
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player"> {/* css 추가 */}
          <Player initailName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player initailName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/> {/* turns 속성 추가 */}
      </div>
      <Log turns={gameTurns} />
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
