/* eslint-disable jsx-a11y/anchor-is-valid */
import { AddGuessForm } from "./AddGuessForm";
import { useGuesses } from "../hooks/useGuesses";
import { Guesses } from "./Guesses";
import { Hint } from "./Hint";

export interface PlayingProps {
  length: number;
  stopGame: () => void;
}

export function Playing({ length, stopGame }: PlayingProps) {
  const { addGuess, guesses, deleteGuess, changeGuessCharKind } = useGuesses();
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "5px",
          top: "5px",
        }}
      >
        <a onClick={stopGame} href="#">
          End game
        </a>
      </div>
      <div className="Game" style={{ display: "block" }}>
        <div className="Game-options">
          <p>Your word is {length} letters long.</p>
        </div>
        <Guesses
          guesses={guesses}
          deleteGuess={deleteGuess}
          changeGuessCharKind={changeGuessCharKind}
        />
        <AddGuessForm addGuess={addGuess} length={length} />
        <Hint guesses={guesses} length={length} />
      </div>
    </>
  );
}
