# Tic-Tac-Toe 프로젝트 아키텍처 및 핵심 개념 분석

이 문서는 현재까지 개발된 Tic-Tac-Toe 애플리케이션의 구조, 주요 컴포넌트의 역할, 그리고 상태 관리 로직에 대해 시니어 프론트엔드 개발자의 관점에서 상세히 설명합니다.

## 1. 프로젝트 개요

이 프로젝트는 React를 사용하여 구현된 클래식 Tic-Tac-Toe 게임입니다. 사용자는 두 명의 플레이어 이름을 설정할 수 있으며, 번갈아 가며 게임판에 'X'와 'O'를 놓아 승부를 겨룹니다.

주요 기술 스택은 다음과 같습니다.

- **Framework**: React
- **State Management**: React Hooks (`useState`)

## 2. 컴포넌트 구조

애플리케이션은 다음과 같은 계층적 컴포넌트 구조로 이루어져 있습니다.

```
App
├── Player (Player 1)
├── Player (Player 2)
└── GameBoard
```

- **`App.jsx`**: 애플리케이션의 최상위 컴포넌트로, 모든 하위 컴포넌트를 렌더링하고 게임의 핵심 상태(활성 플레이어)를 관리합니다.
- **`Player.jsx`**: 각 플레이어의 정보를 표시하고, 플레이어 이름 변경 기능을 제공합니다.
- **`GameBoard.jsx`**: 게임이 진행되는 보드를 렌더링하고, 사용자의 선택에 따라 보드 상태를 업데이트합니다.

## 3. 핵심 로직 및 상태 관리

### 3.1. 상태 끌어올리기 (Lifting State Up)

이 프로젝트의 가장 중요한 아키텍처 패턴은 **"상태 끌어올리기"**입니다.

- **문제**: `GameBoard`에서 셀이 클릭되었을 때, `App` 컴포넌트가 활성 플레이어를 변경해야 합니다. 또한, `Player` 컴포넌트는 현재 어떤 플레이어가 활성 상태인지 알아야 시각적 피드백(하이라이트)을 제공할 수 있습니다.
- **해결**: 여러 컴포넌트에서 공유해야 하는 상태인 `activePlayer`를 부모 컴포넌트인 `App`에서 중앙 관리합니다.

#### `src/App.jsx`

```javascript
function App() {
  const [activePlayer, setActivePlayer]  = useState('X');

  function handleSelectSquare(){ 
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
  }

  return (
    <main>
      {/* ... */}
      <Player /* ... */ isActive={activePlayer === 'X'}/>
      <Player /* ... */ isActive={activePlayer === 'O'} />
      <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
      {/* ... */}
    </main> 
  );
}
```

- `activePlayer` 상태는 `App`에서 `useState`로 선언되었습니다.
- 이 상태는 `Player` 컴포넌트로 `isActive` prop을 통해 전달되어 현재 턴인 플레이어에게 하이라이트 효과를 줍니다.
- `GameBoard`에서는 `onSelectSquare` prop을 통해 `handleSelectSquare` 함수를 호출하여 `App`의 `activePlayer` 상태를 변경할 수 있습니다.

### 3.2. 파생 상태 (Derived State)와 단방향 데이터 흐름

- **`Player.jsx`** 에서는 `isEditing` 상태를 기반으로 "Edit" 버튼과 "Save" 버튼, 그리고 텍스트 필드의 렌더링 여부를 결정합니다. 이는 상태에 따라 UI가 파생되는 좋은 예시입니다.

#### `src/components/Player.jsx`

```javascript
export default function player({ initailName, symbol, isActive }) {
  const [playerName, setPlayerName] = useState(initailName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }
  // ...
}
```

- `isEditing`이라는 하나의 상태가 `editablePlayerName` 변수의 내용과 버튼의 텍스트를 모두 결정합니다. 이처럼 React에서는 상태를 최소한으로 유지하고, 그 상태로부터 UI를 계산(파생)해내는 것이 권장됩니다.

### 3.3. 불변성을 통한 상태 업데이트

- **`GameBoard.jsx`** 에서 게임 보드 상태를 업데이트할 때, 기존 `gameBoard` 배열을 직접 수정하지 않고 새로운 배열을 생성하여 상태를 업데이트합니다. 이는 React에서 상태 업데이트의 핵심 원칙인 **불변성(Immutability)**을 지키는 방법입니다.

#### `src/components/GameBoard.jsx`

```javascript
function handleSelectSquare(rowIndex, colIndex) {
  setGameBoard((prevGameBoard) => {
    // prevGameBoard를 직접 수정하지 않기 위해 깊은 복사를 수행합니다.
    const updatedBoard = prevGameBoard.map((row) => [...row]);
    updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    return updatedBoard;
  });

  onSelectSquare();
}
```

- `prevGameBoard.map((row) => [...row])`를 통해 2차원 배열을 안전하게 복사합니다.
- React는 상태가 변경되었는지 확인하기 위해 참조(reference)를 비교하므로, 새로운 배열을 생성하여 반환해야만 리렌더링이 올바르게 트리거됩니다.

## 4. 결론 및 다음 단계 제안

현재까지의 코드는 React의 핵심 개념인 컴포넌트 기반 아키텍처, 상태 끌어올리기, 불변성을 이용한 상태 관리를 효과적으로 적용하고 있습니다.

**향후 개선 방향:**

1.  **승리 조건 로직 추가**: 현재는 게임이 무한정 계속됩니다. 게임 보드 상태가 변경될 때마다 승리, 무승부 여부를 체크하는 로직을 `App` 또는 `GameBoard` 컴포넌트에 추가해야 합니다.
2.  **게임 기록(History) 관리**: 사용자가 특정 시점의 게임 상태로 되돌아갈 수 있도록, 매 턴의 게임 보드 상태를 배열로 저장하고 관리하는 기능을 추가할 수 있습니다.
3.  **컴포넌트 분리**: `Log` 컴포넌트를 새로 만들어 플레이어의 턴 기록을 표시하는 기능을 분리하면 `App` 컴포넌트의 책임을 덜 수 있습니다.

이상으로 현재까지의 작업 내용에 대한 분석을 마칩니다.
