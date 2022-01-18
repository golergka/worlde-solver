import React from "react";

export interface NoGameProps {
  startGame: (length: number) => void;
}

export function NoGame({ startGame }: NoGameProps) {
  const [length, setLength] = React.useState<number | undefined>(undefined);
  return (
    <form
      onSubmit={(e) => {
        startGame(length!);
        e.preventDefault();
      }}
    >
      <p>Start a new game!</p>
      <label>
        How many letters are in your word?
        <p />
        <input
          type="text"
          min="1"
          max="20"
          onChange={(e) => setLength(parseInt(e.target.value))}
        />
      </label>
      <p />
      <input type="submit" value="Start" disabled={!length} />
    </form>
  );
}
