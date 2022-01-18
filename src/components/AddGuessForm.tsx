import React from "react";

interface AddGuessFormProps {
  addGuess: (newGuess: string) => void;
  length: number;
}

export function AddGuessForm({ addGuess, length }: AddGuessFormProps) {
  const [newGuess, setNewGuess] = React.useState<string>("");
  const canSubmit = newGuess.length === length;
  return (
    <div className="Game-options">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!canSubmit) {
            return;
          }
          addGuess(newGuess);
          setNewGuess("");
        }}
      >
        <label>
          Add new word:
          <input
            type="text"
            value={newGuess}
            onChange={(e) => setNewGuess(e.target.value)}
          />
        </label>
        <input type="submit" value="Add" disabled={!canSubmit} />
      </form>
    </div>
  );
}
