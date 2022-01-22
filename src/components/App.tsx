import React from "react";
import { useDictionary } from "../hooks/useDictionary";
import "./App.css";
import { DictionaryChooser } from "./DictionaryChooser";
import { NoGame } from "./NoGame";
import { Playing } from "./Playing";

type NoGameState = {
  kind: "no_game";
};

type PlayingState = {
  kind: "playing";
  length: number;
};

type GameState = NoGameState | PlayingState;

function App() {
  const [state, setState] = React.useState<GameState>({ kind: "no_game" });
  const startGame = (length: number) => {
    setState({ kind: "playing", length });
  };
  const stopGame = () => {
    setState({ kind: "no_game" });
  };
  const dictionaryData = useDictionary();
  return (
    <div className="page">
      <div className="page__wrapper">
        <section className="section section--full section--white">
          <div className="container">
            <div className="App-container">
              <DictionaryChooser data={dictionaryData} />
              {state.kind === "no_game" ? (
                <NoGame startGame={startGame} />
              ) : (
                <Playing
                  length={state.length}
                  stopGame={stopGame}
                  dictionaryState={dictionaryData.state}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
