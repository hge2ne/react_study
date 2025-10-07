export default function GameOver({winner, onRestart}){
    return <div id="game-over"> {/* css 입히기 */}
        <h2>Game Over!</h2>
        <p>{winner && <p>{winner} won!</p>}
        {!winner && <p>It&apos;'s a draw!</p>}
            <button onClick={onRestart}>Rematch!</button>
        </p>
    </div>
}