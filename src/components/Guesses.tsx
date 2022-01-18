/* eslint-disable jsx-a11y/anchor-is-valid */
import { Guess } from "../model/Guess";
import { GuessCharKind } from "../model/GuessCharKind";
import "./Guesses.css";

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

function charKindStyle(kind: GuessCharKind): string {
  switch (kind) {
    case GuessCharKind.Unknown:
      return "";
    case GuessCharKind.Wrong:
      return "letter-absent";
    case GuessCharKind.WrongPlace:
      return "letter-elsewhere";
    case GuessCharKind.Correct:
      return "letter-correct";
  }
}

export function Guesses({
  guesses,
  changeGuessCharKind,
}: GuessesProps) {
  return (
    <>
      {guesses.map((guess, i) => (
        <div key={i} className="Row Row-locked-in">
          {guess.map((guessChar, j) => (
            <div
              className={`Row-letter ${charKindStyle(guessChar.kind)}`}
              key={j}
              style={{
                backgroundColor: charKindColor(guessChar.kind),
              }}
              onClick={() => changeGuessCharKind(i, j)}
            >
              {guessChar.char}
            </div>
          ))}
          <div
            style={{
            }}
          >
          </div>
        </div>
      ))}
    </>
  );
}
