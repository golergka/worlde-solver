import { GuessCharKind } from "./GuessCharKind";


export function nextGuessCharkind(input: GuessCharKind) {
  switch (input) {
    case GuessCharKind.Unknown:
      return GuessCharKind.Wrong;
    case GuessCharKind.Wrong:
      return GuessCharKind.WrongPlace;
    case GuessCharKind.WrongPlace:
      return GuessCharKind.Correct;
    case GuessCharKind.Correct:
      return GuessCharKind.Unknown;
  }
}
