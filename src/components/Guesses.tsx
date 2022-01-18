import { Guess } from "../model/Guess";
import { GuessCharKind } from "../model/GuessCharKind";

interface GuessesProps {
  guesses: Guess[];
  deleteGuess: (index: number) => void;
  changeGuessCharKind: (index: number, charIndex: number) => void;
}


function charKindColor(kind: GuessCharKind): string {
  switch (kind) {
    case GuessCharKind.Unknown:
      return "white";
    case GuessCharKind.Wrong:
      return "gray";
    case GuessCharKind.WrongPlace:
      return "yellow";
    case GuessCharKind.Correct:
      return "green";
  }
}
export function Guesses({
  guesses,
  deleteGuess,
  changeGuessCharKind,
}: GuessesProps) {
  return (
    <table>
      <tbody>
        {guesses.map((guess, i) => (
          <tr key={i}>
            {guess.map((guessChar, j) => (
              <td
                key={j}
                style={{
                  backgroundColor: charKindColor(guessChar.kind),
                }}
                onClick={() => changeGuessCharKind(i, j)}
              >
                {guessChar.char}
              </td>
            ))}
            <td key="delete">
              <button onClick={() => deleteGuess(i)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
