import React from "react";
import { Guess } from "../model/Guess";
import { GuessCharKind } from "../model/GuessCharKind";
import { nextGuessCharkind } from "../model/nextGuessCharkind";
import { GuessChar } from "../model/GuessChar";

export function useGuesses(): {
  guesses: Guess[];
  addGuess: (newGuess: string) => void;
  deleteGuess: (index: number) => void;
  changeGuessCharKind: (index: number, charIndex: number) => void;
} {
  const [guesses, setGuesses] = React.useState<Guess[]>([]);
  const addGuess = (newGuess: string) => {
    const guess = newGuess.split("").map((char, charIndex): GuessChar => {
      if (guesses.length === 0) {
        return { char, kind: GuessCharKind.Unknown };
      }
      const prevChar = guesses[guesses.length - 1][charIndex];
      return {
        char,
        kind: prevChar.char === char ? prevChar.kind : GuessCharKind.Unknown,
      };
    });
    setGuesses(guesses.concat([guess]));
  };
  const deleteGuess = (index: number) => {
    const newGuess = [...guesses];
    newGuess.splice(index, 1);
    setGuesses(newGuess);
  };
  const changeGuessCharKind = (index: number, charIndex: number) => {
    const newGuess = [...guesses];
    const guessChar = newGuess[index][charIndex];
    newGuess[index][charIndex] = {
      ...guessChar,
      kind: nextGuessCharkind(guessChar.kind),
    };
    setGuesses(newGuess);
  };
  return { guesses, addGuess, deleteGuess, changeGuessCharKind };
}
