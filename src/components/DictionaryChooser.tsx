import { DictionaryType, dictionaryTypesLocalized } from "../dictionary";
import { DictionaryData, tryGetType } from "../hooks/useDictionary";

export interface DictionaryChooserProps {
  data: DictionaryData;
}

export function DictionaryChooser({
  data: { state: dictionary, loadDictionary },
}: DictionaryChooserProps) {
  let label;

  switch (dictionary.state) {
    case "no-dictionary":
      label = <p>No dictionary loaded</p>;
      break;
    case "loading-dictionary":
      label = <p>Loading dictionary...</p>;
      break;

    case "error-loading-dictionary":
      label = (
        <>
          <p>Error loading dictionary</p>
          <button onClick={() => loadDictionary(dictionary.dictionaryType)}>
            Retry
          </button>
        </>
      );
      break;

    case "ready-dictionary":
      label = <p>Dictionary loaded</p>;
      break;
  }
  return (
    <>
      <select
        value={tryGetType(dictionary)}
        onChange={(event) => {
          loadDictionary(event.target.value as DictionaryType);
        }}
      >
        {dictionaryTypesLocalized.map(({ type, label }) => (
          <option key={type} value={type}>
            {label}
          </option>
        ))}
      </select>
      {label}
    </>
  );
}
