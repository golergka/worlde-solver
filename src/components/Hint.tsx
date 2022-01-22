import { Guess } from "../model/Guess";
import React from "react";
import { GuessCharKind } from "../model/GuessCharKind";
import { DictionaryState } from "../hooks/useDictionary";

interface HintProps {
  guesses: Guess[];
  length: number;
  dictionaryState: DictionaryState;
}

interface CharConstraint {
  min?: number;
  exact?: true;
  correctPositions: number[];
  wrongPositions: number[];
}

type CharConstraints = { [char: string]: CharConstraint };

function guessConstraint(guess: Guess): CharConstraints {
  const result: CharConstraints = {};
  for (let i = 0; i < guess.length; i++) {
    const guessChar = guess[i];
    let charCount = result[guessChar.char];
    if (charCount === undefined) {
      charCount = result[guessChar.char] = {
        correctPositions: [],
        wrongPositions: [],
      };
    }
    switch (guessChar.kind) {
      case GuessCharKind.Correct:
        if (charCount.min === undefined) {
          charCount.min = 1;
        } else {
          charCount.min++;
        }
        charCount.correctPositions.push(i);
        break;

      case GuessCharKind.WrongPlace:
        if (charCount.min === undefined) {
          charCount.min = 1;
        } else {
          charCount.min++;
        }
        charCount.wrongPositions.push(i);
        break;

      case GuessCharKind.Wrong:
        if (charCount.min === undefined) {
          charCount.min = 0;
        }
        charCount.exact = true;
        break;
    }
  }
  return result;
}

function guessesConstraints(guesses: Guess[]): CharConstraints {
  const result: CharConstraints = {};
  const charCounts = guesses.map(guessConstraint);
  const allChars = [
    ...new Set(charCounts.flatMap((charCount) => Object.keys(charCount))),
  ];
  for (const char of allChars) {
    const counts = charCounts
      .map((charCount) => charCount[char])
      .filter((c) => c !== undefined);
    const min = Math.max(
      ...counts.map((c) => c.min).filter((c): c is number => c !== undefined)
    );
    const correctPositions = counts.flatMap((c) => c.correctPositions);
    const wrongPositions = counts.flatMap((c) => c.wrongPositions);
    const exact = counts.some((c) => c.exact === true) || undefined;
    result[char] = { min, exact, correctPositions, wrongPositions };
  }
  return result;
}

interface CharCount {
  [char: string]: number;
}

function countUnconstrainedCharacters(
  words: string[],
  constraints: CharConstraints
): CharCount {
  const result: { [char: string]: number } = {};
  for (const word of words) {
    for (const char of word) {
      if (constraints[char] !== undefined) {
        continue;
      }
      if (result[char] === undefined) {
        result[char] = 1;
      } else {
        result[char]++;
      }
    }
  }
  return result;
}

function wordScore(word: string, charCount: CharCount): number {
  const wordChars = [...new Set(word.split(""))];
  let result = 0;
  for (const wordChar of wordChars) {
    if (charCount[wordChar] !== undefined) {
      result += charCount[wordChar];
    }
  }
  return result;
}

const wordFilter = (constraints: CharConstraints) => (word: string) => {
  for (const char of Object.keys(constraints)) {
    const charConstraint = constraints[char];
    for (const correctPos of charConstraint.correctPositions) {
      if (word[correctPos] !== char) {
        return false;
      }
    }
    for (const wrongPositions of charConstraint.wrongPositions) {
      if (word[wrongPositions] === char) {
        return false;
      }
    }
    const charCount = word.split(char).length - 1;
    if (charConstraint.min !== undefined && charCount < charConstraint.min) {
      return false;
    }
    if (charConstraint.exact && charCount !== charConstraint.min) {
      return false;
    }
  }
  return true;
};

export function Hint({ guesses, length, dictionaryState }: HintProps) {
  if (dictionaryState.state !== "ready-dictionary") {
    return <p>Loading dictionary...</p>;
  }

  const words = dictionaryState.dictionary;

  const constraints = guessesConstraints(guesses);

  const passingWords = words
    .filter((word) => word.length === length)
    .filter(wordFilter(constraints));

  const charCounts = countUnconstrainedCharacters(passingWords, constraints);
  const wordScores: [string, number][] = passingWords.map((word) => [
    word,
    wordScore(word, charCounts),
  ]);
  const sortedWords = wordScores.sort((a, b) => b[1] - a[1]);
  const hints = sortedWords.slice(0, 10).map((w) => w[0]);

  console.log({ constraints, passingWords, charCounts, sortedWords });

  return (
    <>
      <p>Top 10 hints:</p>
      <ul>
        {hints.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ul>
      <i>Dictionary loaded with {words.length} words</i>
    </>
  );
}
