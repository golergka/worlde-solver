import React from "react";

interface AddGuessFormProps {
  addGuess: (newGuess: string) => void;
  length: number
}

export function AddGuessForm({ addGuess, length }: AddGuessFormProps) {
  const [newGuess, setNewGuess] = React.useState<string>("");
  return <form
    onSubmit={(e) => {
      addGuess(newGuess);
      setNewGuess("");
      e.preventDefault();
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
    <input type="submit" value="Add" disabled={newGuess.length !== length} />
  </form>;
}
