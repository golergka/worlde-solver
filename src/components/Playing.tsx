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
      <button onClick={stopGame}>End game</button>
      <p>Your word is {length} letters long.</p>
      <Guesses
        guesses={guesses}
        deleteGuess={deleteGuess}
        changeGuessCharKind={changeGuessCharKind}
      />
      <AddGuessForm addGuess={addGuess} length={length} />
      <Hint guesses={guesses} length={length} />
    </>
  );
}
