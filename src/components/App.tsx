import React from "react";
import "./App.css";
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
  switch (state.kind) {
    case "no_game":
      return <NoGame startGame={startGame} />;
    case "playing":
      return <Playing length={state.length} stopGame={stopGame} />;
  }
}

export default App;
