import Player from "./components/Player.jsx";
import TimerChallenge from "./components/TimerChallenge.jsx";

function App() {
  return (
    <>
      <Player />
      <div id="challenges"></div>
      <TimerChallenge title="Easy" targetTime={1} />
      <TimerChallenge title="Not easy" targetTime={5} />
      <TimerChallenge title="Getting tough" targetTime={10} />
      <TimerChallenge title="Pros only" targetTime={15} />
    </>
  );
}

export default App;
