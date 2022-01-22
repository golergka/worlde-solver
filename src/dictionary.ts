export enum DictionaryType {
  WordsAlpha = "WORDS_ALPHA",
}

function dictionarySource(type: DictionaryType) {
  switch (type) {
    case DictionaryType.WordsAlpha:
      return "words_alpha.txt";
  }
}

export const dictionaryTypesLocalized = [{
  type: DictionaryType.WordsAlpha,
  label: "English",
}];

export async function loadDictionary(type: DictionaryType): Promise<string[]> {
  const response = await fetch(dictionarySource(type));
  const raw = await response.text();
  return raw.split("\n").map((w) => w.trim());
}
