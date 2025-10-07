# Tic-Tac-Toe: 상태 관리 리팩토링 및 파생 상태 활용

안녕하세요! 시니어 프론트엔드 개발자입니다. Tic-Tac-Toe 게임의 상태 관리 로직을 개선하고, React의 중요한 개념인 '파생 상태(Derived State)'를 활용하여 코드를 더 효율적이고 예측 가능하게 만드는 과정을 단계별로 설명해 드리겠습니다.

## 1. 문제점: 중복 상태와 단방향 데이터 흐름의 부재

이전 코드에서는 각 컴포넌트가 독립적으로 상태를 관리하고 있었습니다. 특히 `GameBoard` 컴포넌트는 자체적으로 게임 보드의 상태를 `useState`로 관리했습니다. 이는 다음과 같은 잠재적인 문제를 야기합니다.

- **상태의 중복**: `App` 컴포넌트의 `gameTurns` 상태와 `GameBoard` 컴포넌트의 `gameBoard` 상태는 사실상 동일한 정보를 다른 형태로 표현하고 있습니다. 이는 불필요한 중복이며, 두 상태 간의 동기화 문제를 일으킬 수 있습니다.
- **복잡한 데이터 흐름**: 상태를 업데이트하기 위해 여러 컴포pon넌트에 걸쳐 props를 전달하고 콜백 함수를 호출하는 과정이 복잡해집니다.

## 2. 해결책: 상태 끌어올리기(Lifting State Up) 및 파생 상태 활용

React의 핵심 원칙 중 하나는 **단일 진실 공급원 (Single Source of Truth)**을 유지하는 것입니다. 여러 컴포넌트에서 동일한 데이터를 필요로 할 때는 가장 가까운 공통 조상 컴포넌트로 상태를 끌어올려야 합니다.

이번 리팩토링에서는 `App` 컴포넌트가 모든 상태 관리의 중심이 되도록 하고, `GameBoard`는 `App`으로부터 받은 `turns` prop을 기반으로 화면을 렌더링만 하도록 변경했습니다. `GameBoard`가 직접 상태를 갖는 대신, props로부터 필요한 데이터를 **파생**하여 사용하는 것입니다.

## 3. 단계별 코드 변경 사항

### 3.1. `src/components/GameBoard.jsx`: 상태를 직접 관리하지 않고 props로부터 파생

`GameBoard` 컴포넌트는 더 이상 게임 보드의 상태를 직접 `useState`로 관리하지 않습니다. 대신 `App` 컴포넌트로부터 `turns`라는 prop을 전달받아, 이 데이터를 기반으로 최신 게임 보드 상태를 계산(파생)합니다.

**변경 전 (`src/components/GameBoard.jsx`)**
```jsx
// ...
export default function GameBoard({onSelectSquare, activePlayerSymbol}) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSelectSquare(rowIndex, colIndex) {
    // ... 상태 업데이트 로직 ...
  }
  // ...
}
```

**변경 후 (`src/components/GameBoard.jsx`)**
```jsx
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({onSelectSquare, turns}) { // 1. activePlayerSymbol prop 제거, turns prop 추가
  let gameBoard = initialGameBoard; // 2. 초기 게임 보드로 시작

  // 3. turns 배열을 순회하며 gameBoard 상태를 최신으로 파생
  for (const turn of turns) {
    const {square,player} = turn;
    const {row,col} = square
    gameBoard[row][col]= player;
  }

  return (
    <ol>
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* 4. 클릭 시 onSelectSquare에 행/열 인덱스 전달 */}
                <button onClick={()=>onSelectSquare(rowIndex,colIndex)}>
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
```

**핵심 변경사항:**

1.  **Props 변경**: `activePlayerSymbol` prop을 제거하고, `App` 컴포넌트의 `gameTurns` 배열을 `turns` prop으로 받습니다.
2.  **파생 상태**: `useState`를 사용해 `gameBoard` 상태를 직접 관리하는 대신, `turns` 배열을 순회하면서 `initialGameBoard`를 기반으로 최신 `gameBoard`를 **매 렌더링마다 새롭게 계산**합니다. 이것이 바로 '파생 상태'의 핵심입니다. 상태를 저장하는 것이 아니라, 기존 상태(props)로부터 계산해내는 것입니다.
3.  **이벤트 핸들러 수정**: `GameBoard` 내부의 `handleSelectSquare` 함수를 제거했습니다. 이제 각 버튼의 `onClick` 이벤트는 `App` 컴포넌트로부터 받은 `onSelectSquare` 함수를 직접 호출하며, 선택된 칸의 `rowIndex`와 `colIndex`를 인자로 전달합니다. 이를 위해 익명 화살표 함수 `() => onSelectSquare(rowIndex, colIndex)`를 사용했습니다.

### 3.2. `src/App.jsx`: `GameBoard`에 `turns` prop 전달

`App` 컴포넌트는 이제 `GameBoard`에게 게임의 모든 턴 정보를 담고 있는 `gameTurns` 상태를 `turns` prop으로 전달합니다.

**변경 전 (`src/App.jsx`)**
```jsx
// ...
function App() {
  // ...
  return (
    // ...
    <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
    // ...
  );
}
```

**변경 후 (`src/App.jsx`)**
```jsx
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";


function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns => {
      let currentPlayer = 'X';
      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O';
      }
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initailName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player initailName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        {/* activePlayerSymbol prop 대신 turns prop 전달 */}
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
```

**핵심 변경사항:**

1.  **Prop 변경**: `GameBoard`에 `activePlayerSymbol` prop 대신 `gameTurns` 상태를 `turns`라는 이름의 prop으로 전달합니다. 이제 `GameBoard`는 `turns` 정보만으로 스스로 화면을 그릴 수 있습니다.

## 4. 결론: 왜 이 리팩토링이 중요한가?

- **단일 진실 공급원**: 이제 게임의 모든 상태는 `App` 컴포넌트의 `gameTurns`가 유일하게 관리합니다. 데이터 흐름이 `App -> GameBoard`로 명확해졌습니다.
- **코드 단순화**: `GameBoard`는 상태 관리 로직 없이 순수하게 UI를 렌더링하는 역할에만 집중하게 되어 더 단순하고 재사용하기 쉬운 컴포넌트가 되었습니다.
- **버그 감소**: 상태를 중복으로 관리할 때 발생할 수 있는 동기화 문제를 원천적으로 차단하여 버그 발생 가능성을 줄였습니다.
- **예측 가능성**: `GameBoard`는 항상 `turns` prop에 의해 결정되므로, 어떤 props가 주어졌을 때 어떻게 렌더링될지 예측하기가 매우 쉬워졌습니다.

이처럼 상태를 끌어올리고 파생 상태를 활용하는 것은 React 애플리케이션을 더욱 견고하고 유지보수하기 쉽게 만드는 핵심적인 패턴입니다. 앞으로 컴포넌트를 작성하실 때, "이 상태가 정말 이 컴포넌트에만 필요한가?"를 항상 고민해 보시는 것이 좋습니다.
