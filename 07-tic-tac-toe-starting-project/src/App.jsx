import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react"; 
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = { //상수 형식 : 단어들이 밑줄로 구분된 스타일(이 앺을 위해 정의된 일반 상수라는 것을 나타냄)
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

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

function deriveWinner(gameBoard, players){
  let winner;
  //for문 역할 : 매 차례마다 모든 우승 조합 검토
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol= gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol= gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol= gameBoard[combination[2].row][combination[2].column]

    //동일한 기호인지 확인하기 위해 if문 사용
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ){
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns,){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array=>[...array])]; // 게임리셋 시, 게임판 초기화하는 방법 (깊은 복사)
 
  for (const turn of gameTurns) { // 루프 안에서 이미 나온 차례에 대한 정보 추출함
    const {square,player} = turn;
    const {row,col} = square // 객체 구조 분해할당을 2번 실행

    gameBoard[row][col]= player; 
  }
  return gameBoard;
}

function App() {
  const [players,setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns]=useState([]);
  const activePlayer = deriverActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard,players);
  
  // 무승부로 게임이 끝날 경우 처리
  const hasDraw = gameTurns.length === 9 && !winner;


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
  function handleRestart(){
    setGameTurns([]);
  }

function handlePlayerNameChange(symbol,newName) {
  setPlayers(prevPlayers => {
    return {
      ...prevPlayers,
      [symbol]: newName
    };
  });
}

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player"> {/* css 추가 */}
          <Player initailName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'}
          onChangeName={handlePlayerNameChange}
          />
          <Player initailName={PLAYERS.O}  symbol="O" isActive={activePlayer === 'O'} 
          onChangeName={handlePlayerNameChange}
          
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>} {/* 우승자가 true인지 기호는 x인지 o인지 확인 */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/> {/* turns 속성 추가 */}
      </div>
      <Log turns={gameTurns} />
    </main> 
  );
}


export default App;
