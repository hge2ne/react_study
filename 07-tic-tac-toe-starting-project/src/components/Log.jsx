export default function Log({turns}) { //현재까지 게임에서 진행된 순서에 대한 반환값을 보여주는 컴포넌트
    return <ol id="log">
        {turns.map((turn) => (
<li key={`${turn.square.row}${turn.square.col}`}>{turn.player}slected{turn.square.row},{turn.square.col}</li>
        ))}
    </ol> /* turns 속성을 목록 안의 목록 아이템으로 매핑하여 ol에 넣기 
    turn.player : 기호에 대한 내용
     */
}